import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { SortEvent } from 'primeng/api';
import { Document } from 'src/app/workstation/model/document';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { RecevabiliteService } from 'src/app/workstation/service/recevabilite/recevabilite.service';

@Component({
  selector: 'app-verifier-demande-cession',
  templateUrl: './verifier-demande-cession.component.html',
  styleUrls: ['./verifier-demande-cession.component.scss']
})
export class VerifierDemandeCessionComponent implements OnInit {
  demandeCession: any;
  documents: Document[];
  cols: any[];
  pas_identifie: boolean;
  identifie: boolean;
  pas_atd: boolean;
  atd: boolean;
  pas_nantissement: boolean;
  pas_interdiction: boolean;
  recevabiliteDemande: any;
  interdiction: boolean;
  nantissement: boolean;
  infosBEForm: any;
  infosBEDialog: boolean=false;
  observation: any;

  constructor(
    private demandeCessionService:DemandesCessionService,
    private documentService:DocumentService,
    private recevabiliteService:RecevabiliteService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
      this.demandeCessionService.getDemandeObs().subscribe(data=>{
        this.demandeCession=data
        console.log(this.demandeCession)
      })

      this.documentService.getDocuments().subscribe(data=>{
        this.documents=data
      })

      this.cols = [
        {field: 'typeDocument', header: 'Type de document'},
        {field: 'nomDocument', header: 'Nom Document'},
        {field: 'dateSoumission', header: 'Date Soumission'}
    ];

    this.infosBEForm = this.formBuilder.group({
      naturePrestation: [''],
      natureDepense: [''],
      imputation: [''],
      modeReglement: [''],
      beneficiaire: [''],
      identificationComptable: [''],
      typeDepense: [''],
      objetDepense: [''],
      montantDepense: [''],
      date: [''],
      destination: ['']

  });
  }

  
  handleChange11(e){
    this.pas_identifie=false
   
  }
  handleChange12(e){
    this.identifie=false
  }

  handleChange21(e){
    this.pas_atd=false
   
  }
  handleChange22(e){
    this.atd=false
  }
  handleChange31(e){
    this.pas_nantissement=false
   
  }
  handleChange32(e){
    this.nantissement=false
  }

  handleChange41(e){
    this.pas_interdiction=false
   
  }
  handleChange42(e){
    this.interdiction=false
  }

  onSubmit(){

    this.recevabiliteDemande={
      identificationBudgetaire:this.identifie,
      atd:this.atd,
      nantissement:this.nantissement,
      interdictionBancaire:this.interdiction,
      observation:this.observation,
      infoBE:this.infosBEForm.value,
      referenceBE:this.demandeCession.referenceBE,
      demandeCessionId:this.demandeCession.id
    }

    console.log(this.recevabiliteDemande)

    this.enregistrerTraitementRecevabilite(this.recevabiliteDemande)

    this.closeDialog()

    
  }
  enregistrerTraitementRecevabilite(demande:any) {
    this.recevabiliteService.postRecevabilite(demande).subscribe(data=>{
      console.log("done")
    })
  }

  renseignerInfosBE(){
    this.infosBEDialog=true;
  }

  closeDialog(){
    this.infosBEDialog=false;
  }
}
