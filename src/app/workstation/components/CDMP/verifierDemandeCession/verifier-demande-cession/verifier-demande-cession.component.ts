import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { RecevabiliteService } from 'src/app/workstation/service/recevabilite/recevabilite.service';
import { Documents } from 'src/app/workstation/model/document';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../../visualiser-document/visualiser-document.component';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { Router } from '@angular/router';
import { take, takeUntil, takeWhile } from 'rxjs/operators';
import { HttpHeaderResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifier-demande-cession',
  templateUrl: './verifier-demande-cession.component.html',
  styleUrls: ['./verifier-demande-cession.component.scss'],
  providers: [DialogService]
})
export class VerifierDemandeCessionComponent implements OnInit {
  demandeCession: any;
  documents: Documents[];
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
  infosBEDialog: boolean = false;
  observation: any;
  items: MenuItem[];
  home: MenuItem;
  notifier=new HttpHeaderResponse();

  constructor(
    private demandeCessionService: DemandesCessionService,
    private documentService: DocumentService,
    private recevabiliteService: RecevabiliteService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demandeCession = data
      console.log(this.demandeCession)
    })

    this.documentService.getDeocumentVRF().subscribe(data => {
      this.documents = data
    })

    this.cols = [
      { field: 'typeDocument', header: 'Type de document' },
      { field: 'nomDocument', header: 'Nom Document' },
      { field: 'dateSoumission', header: 'Date Soumission' }
    ];

    this.infosBEForm = this.formBuilder.group({
      naturePrestation: ['',Validators.required],
      referenceBE: [this.demandeCession.referenceBE,Validators.required],
      imputation: ['',Validators.required],
      modeReglement: ['',Validators.required],
      beneficiaire: ['',Validators.required],
      identificationComptable: ['',Validators.required],
      typeDepense: ['',Validators.required],
      objetDepense: ['',Validators.required],
      montantDepense: ['',Validators.required],
      date: ['',Validators.required],
      destination: ['',Validators.required]

    });
    this.items = [
      { label: 'Liste des demandes de cession', url: '/#/workstation/cdmp/recevabilite' },
      { label: 'Recevabilité' }
    ];

    this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };

  }

  onSubmit() {

    this.recevabiliteDemande = {...this.demandeCession,
      ...{identificationBudgetaire: this.identifie,
        atd:this.atd ? "Existance ATD":"Aucun ATD",
        nantissement: this.nantissement ? "Créance nanti":"Créance pas nanti",
        interdictionBancaire:this.interdiction ? "Existance d'une interdiction bancaire":"Aucune interdiction bancaire",
        observation: this.observation,
        statut:"Recevable"},
        ...this.infosBEForm.value

    }
    

    console.log(this.recevabiliteDemande)

    this.enregistrerTraitementRecevabilite(this.recevabiliteDemande)

    this.closeDialog()


  }

  
  rejeterDemande(){
    let demande = {
      observation: this.observation,
      statut:"rejeté"
    }
    this.demandeCessionService.patchDemandeCession(this.demandeCession.id,demande).pipe(take(5)).subscribe(data => {
      console.log(data);
      //cette ligne est à supprimer lorsque l'on fera la connexion avec le back
      if(data.type==4){
        this.recevabiliteService.deleteRecevabilite(this.demandeCession.id).subscribe(data=>{
          console.log("done:",data);
          this.router.navigate(['workstation/cdmp/recevabilite/'])
          console.log("done");
        }
          )
      }
      
    })
  }
  enregistrerTraitementRecevabilite(demande: any) {
    console.log(demande);
   this.demandeCessionService.patchDemandeCession(this.demandeCession.id,demande).pipe(take(5)).subscribe(data=>{
    console.log(data);
    if(data.type==4){
      //ces deux appels suivantes sont à supprimer lorsque l'on fera la connexion avec le back
      this.recevabiliteService.postAnalyseRisque(demande).subscribe(data => {
        console.log(data);
        if(data.type==4){
          this.recevabiliteService.deleteRecevabilite(this.demandeCession.id).subscribe(data=>{
            console.log(data);
            if(data.type==4){
              this.router.navigate(['workstation/cdmp/recevabilite/'])
              console.log("done");
            }
            
  
          }
          )
        }
       
        
    })
  }
   })
  }

  renseignerInfosBE() {
    this.infosBEDialog = true;
  }

  closeDialog() {
    this.infosBEDialog = false;
  }

  visualiserDocument(document: Documents) {
    let nom = document.nomDocument;
    const ref = this.dialogService.open(VisualiserDocumentComponent, {
      data: {
        document: document
      },
      header:nom,
      width: '70%',
      height: 'calc(100% - 100px)',
      baseZIndex: 10000
    });
  }

  onSubmitRejet() {
       
      
    
    Swal.fire({
        position: 'top-end',
        title: 'Etes-vous sur de vouloir rejeter la demande?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      color:"#203359",
      confirmButtonColor:"#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/cdmp/recevabilite'])
        Swal.fire(
            'Rejetée!',
            'La demande a bien été rejetée.',
            'success'
          )
      }})
    }
  onSubmitA() {
       
      
    
    Swal.fire({
    position: 'top-end',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été completée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color:"#203359",
      confirmButtonColor:"#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      
    }).then(() => {
     
        this.router.navigate(['workstation/cdmp/recevabilite'])
    })


      
}
}
