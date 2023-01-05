import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { PaginationSearchParam } from '../pagination-param';
import { SearchInput } from '../search-input';
import { StatutInput } from '../statut-input';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})

export class SearchFilterComponent implements OnInit {
  @Input() inputs:SearchInput[]=[];
  @Input() inputsDate:SearchInput[]=[];
  @Input() statuts:StatutInput[]=[];
  @Input() paginationParams:PaginationSearchParam;

  @Output() search= new EventEmitter<any[]>();
  @Output() annuler= new EventEmitter<boolean>();
  @Output() isSearching= new EventEmitter<boolean>();


  @ViewChild('dropDownThing')
dropDownThing: Dropdown;

  searchForm = this.fb.group({
  numero_demande: [''],
  nom_marche: [''],
  reference_be: [''],
  montant_creance: [''],
  raison_social: [''],
  solde_pme: [''],
  decote: [''],
  montant_recu: [''],
  ninea: [''],

  date_demande: this.fb.group({
    start_date: [''],
    end_date: ['']
  }),
  date_marche: this.fb.group({
    start_date: [''],
    end_date: ['']
  }),
  statut_libelle: [''],

});

rangeDateDemande:any[];
rangeDateMarche:any[];
value:string;
isDateDemande:boolean;
isDateMarche:boolean;
col:string;


constructor(private fb: FormBuilder,
  private demandeCessionService:DemandesCessionService) {}

  ngOnInit(): void {
    
    this.verifierDatesInputs();
    this.col=this.getColClass();
    console.log(this.getColClass());
  }

  verifierDatesInputs(){
    this.isDateDemande = this.inputsDate.some(element => {
      if (element.name==="date_demande") {        
        return true;
      }
      return false;
    });
    this.isDateMarche = this.inputsDate.some(element => {
      if (element.name==="date_marche") {
        return true;
      }
      return false;
    });

  }

  addDatesForm(){
    if(this.rangeDateDemande){
      this.searchForm.value.date_demande.value={}
      let start=new Date(this.rangeDateDemande[0])
      let end=new Date(this.rangeDateDemande[1])
      start.setHours(0,0,0)
      end.setHours(23,59,59)
      this.searchForm.value['date_demande'].value['start_date']=start
      this.searchForm.value['date_demande'].value['end_date']=end
    }
    
    if(this.rangeDateMarche){
      this.searchForm.value.date_marche.value={}      
      let start=new Date(this.rangeDateMarche[0])
      let end=new Date(this.rangeDateMarche[1])
      start.setHours(0,0,0)
      end.setHours(23,59,59)
      this.searchForm.value['date_marche'].value['start_date']=start
      this.searchForm.value['date_marche'].value['end_date']=end
    }

    
  }


  getSearch(){
    this.addDatesForm();
    
    this.demandeCessionService.search(JSON.stringify(this.searchForm.value),this.paginationParams).subscribe(
      (data)=>{
        console.log(data);
        this.search.emit(data)
        
      }
    ) 
  }

  clear(){
    this.searchForm.reset(this.searchForm.value)
    this.rangeDateDemande=[]
    this.rangeDateMarche=[]
    this.dropDownThing.value = "";
    this.annuler.emit(true)

  }

  getColSize():number{
    let size=Math.round(12/(this.inputs.length+1));
    return size;
  }

  getColClass():string {
    let colClass=("col-"+this.getColSize()).toString();
    return colClass;
  }

}
