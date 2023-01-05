import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { RecevabiliteService } from 'src/app/workstation/service/recevabilite/recevabilite.service';
import { RowSizes } from 'src/app/core/generic-component/cdmp-table/row-sizes.model';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import { FormBuilder } from '@angular/forms';
import { SearchInput } from '../../../generic/search-input';
import { PaginationSearchParam } from '../../../generic/pagination-param';
import { SearchFilterComponent } from '../../../generic/search-filter/search-filter.component';

@Component({
  selector: 'app-recevabilite',
  templateUrl: './recevabilite.component.html',
  styleUrls: ['./recevabilite.component.scss']
})
export class RecevabiliteComponent implements OnInit {

  demandes: any[];

  demande: any;

  submitted: boolean;

  cols: any[];
  rowSizes: any = RowSizes;
  totalRecords: number;

  rowsPerPageOptions : any[]=[5,10,15,20,30];

  items: MenuItem[];
  home: MenuItem;
  subscribe: any;
  rangeDates: any[];
  matchModeOptions: SelectItem[];
  page: any={};
  statuts:any[];
  searchEntry:SearchInput[];
  searchDateEntry:SearchInput[];
  paramStatuts:any[];
  paramStatutsInit:any[];
  defaultRows:number;
  defaultPageSize:number;
  searchForm: any;
  nomMarche:string='';
  referenceBE:string='';
  paginationParams:PaginationSearchParam;
  searching:boolean;

  @ViewChild(SearchFilterComponent) searchComponent!:SearchFilterComponent;
  


  constructor(
    private router: Router,
    private demandeCessionService: DemandesCessionService,
    private recevabiliteService: RecevabiliteService,
    private breadcrumbService: BreadcrumbService,
    private filterService: FilterService,
    private formBuilder:FormBuilder
  ) {
    this.breadcrumbService.setItems([
      { label: 'Liste des demandes de cession' },
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
    //location.reload()

    this.searchForm = this.formBuilder.group({
      nom_marche: ['',],
      reference_be: ['',]
    })
  }

 
  ngOnInit() {
    this.paramStatutsInit = [StatutEnum.recevable, StatutEnum.rejetee,StatutEnum.soumise]
    this.paramStatuts = this.paramStatutsInit
    this.initGetDemandes(this.paramStatuts)

    this.cols = [
  
      { field: 'dateDemandeCession', header: 'Date de demande' },
      { field: 'raisonSocial', header: 'Raison Sociale' },
      { field: 'nomMarche', header: 'Nom marché' },
      { field: 'reference', header: 'Reférence du BE' },
      { field: 'statut', header: 'Statut' }
    ];

    //filtre par range date


    this.matchModeOptions = [
      { label: 'Intervalle de date', value: 'rangeDate' },
      { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contient', value: FilterMatchMode.CONTAINS },
    ];

    this.statuts = [
      {label: 'Soumise', value: 'SOUMISE'},
      {label: 'Rejetée', value: 'REJETEE'},
      {label: 'Recevable', value: 'RECEVABLE'}
    ]
    this.searchEntry = [
      {name: 'nom_marche', placeholder: 'Nom Marché'},
      {name: 'raison_social', placeholder: 'Raison Social'},
      {name: 'reference_be', placeholder: 'Référence BE'},

      
    ]
    this.searchDateEntry = [
      {name: 'date_demande', placeholder: 'Date de soumission'},
    ]

    this.paginationParams={
      page:0,
      size:5,
      sort:"dateDemandeCession,DESC",

    }
  }

  

  paginate(event) { 
  
    console.log(this.page);
    let statutsParam
    if (Array.isArray(this.paramStatuts)) {
      statutsParam = this.paramStatuts.join(",")
    }
    else
      statutsParam = this.paramStatuts
    
    const args = {
      page: event.page,
      size: event.rows,
      sort: "dateDemandeCession,DESC",
      statut: statutsParam

      // search: this.searchText,
    };

    if(this.searching){
      this.paginationParams=args
      this.searchComponent.getSearch()
    }
    else{
      this.page=args
      this.demandeCessionService.getPageDemandeCessionByStatut(args).subscribe(data => {
      this.demandes = data.content
      this.page = data
    });
    }
    
    
}

initGetDemandes(statuts: StatutEnum[]) {
  let statutsParam
  if (Array.isArray(statuts)) {
    statutsParam = statuts.join(",")
  }
  else
    statutsParam = statuts
  const args = {
    page: 0,
    size: 5,
    sort: "dateDemandeCession,DESC",
    statut: statutsParam

    // search: this.searchText,
  };
  this.page=args
  this.demandeCessionService.getPageDemandeCessionByStatut(args).subscribe(data => {
    this.demandes = data.content
    this.totalRecords=data.totalElements
  });


}

filterStatus(event){
  if(event.value)
    this.paramStatuts=[event.value]
  else
    this.paramStatuts=this.paramStatutsInit
  this.initGetDemandes(this.paramStatuts)
  this.OnPageEvent;
  
}

getSearch(data){
  this.demandes=data.content
  this.searching=true
}
clear(annuler){
  if(annuler){
    this.initGetDemandes(this.paramStatutsInit)
    this.searching=false
  }
}
searchPaginate(event){
  
    this.paginationParams={
      page: event.page,
      size: event.rows,
      sort: "dateDemandeCession,DESC",
    }
  
}
OnPageEvent(){
  this.defaultRows=5;
  this.rowsPerPageOptions=[5,10,15,20,30];
}
  verifierDemandeCession(demande: DemandeCession) {
    this.demande = { ...demande };
    this.demandeCessionService.setDemandeObs(demande);
    this.router.navigate(['workstation/cdmp/recevabilite/verifier']);


  }

  private filter(){
    
  }

  // ngOnDestroy() {
  //   this.subscribe.unsubscribe();
  // }


  //effacer le filtre par date
  clearRange(table) {
    this.rangeDates = undefined;
    table.filter()
  }

  consulterDemande(demande) {
    this.demande = { ...demande };
    this.demandeCessionService.setDemandeObs(demande);
    this.router.navigate(['workstation/cdmp/consulter_demande'], {  queryParams: {  page: 'demande cession' } });
  }
}
