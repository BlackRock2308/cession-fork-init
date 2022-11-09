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
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { BonEngagement } from '../../../../model/bonEngagement';
import { DatePipe } from '@angular/common';
import { MY_DATE_FORMATS } from 'src/app/workstation/model/my-date-format';

@Component({
  selector: 'app-verifier-demande-cession',
  templateUrl: './verifier-demande-cession.component.html',
  styleUrls: ['./verifier-demande-cession.component.scss'],
  providers: [DialogService, 
    DatePipe]
  
})
export class VerifierDemandeCessionComponent implements OnInit {
  demandeCession: DemandeCession;
  bonEngagement: BonEngagement;
  documents: any[];
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
    private datepipe: DatePipe,
    private documentService: DocumentService,
    private recevabiliteService: RecevabiliteService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router:Router,
    private breadcrumbService: BreadcrumbService
  ) { this.breadcrumbService.setItems([
    { label: 'Liste des demandes de cession', url: '/#/workstation/cdmp/recevabilite' },
      { label: 'Recevabilité' }
]);
this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] })}

  ngOnInit(): void {
    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demandeCession = data
      console.log(this.demandeCession)
      this.bonEngagement = this.demandeCession.bonEngagement;
    })

      this.documents = this.demandeCession.bonEngagement.documents
   

    this.cols = [
      { field: 'typeDocument', header: 'Type de document' },
      { field: 'nomDocument', header: 'Nom Document' },
      { field: 'dateSoumission', header: 'Date Soumission' }
    ];

    this.infosBEForm = this.formBuilder.group({
      exercice: ['',Validators.required],
      naturePrestation: ['',Validators.required],
      designationBeneficiaire: ['',Validators.required],
      referenceBE: [this.demandeCession.bonEngagement.reference,Validators.required],
      imputation: ['',Validators.required],
      modeReglement: ['',Validators.required],
      destinationAction: ['',Validators.required],
      identificationComptable: ['',Validators.required],
      typeDepense: ['',Validators.required],
      objetDepense: ['',Validators.required],
      montantCreance: ['',Validators.required],
      dateBonEngagement: ['',Validators.required],
      destinationActivite: ['',Validators.required],
      dateSoumissionServiceDepensier: ['',Validators.required]

    });
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

    //this.enregistrerTraitementRecevabilite(this.recevabiliteDemande)

    this.closeDialog()


  }
  
  rejeterDemande(){
    let demande = {
      observation: this.observation,
      statut:"rejeté"
    }
    this.demandeCessionService.patchDemandeCession(this.demandeCession.idDemande,demande).pipe(take(5)).subscribe(data => {
      console.log(data);
      //cette ligne est à supprimer lorsque l'on fera la connexion avec le back
      if(data.type==4){
        this.recevabiliteService.deleteRecevabilite(this.demandeCession.idDemande).subscribe(data=>{
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
   this.demandeCessionService.patchDemandeCession(this.demandeCession.idDemande,demande).pipe(take(5)).subscribe(data=>{
    console.log(data);
    if(data.type==4){
      //ces deux appels suivantes sont à supprimer lorsque l'on fera la connexion avec le back
      this.recevabiliteService.postAnalyseRisque(demande).subscribe(data => {
        console.log(data);
        if(data.type==4){
          this.recevabiliteService.deleteRecevabilite(this.demandeCession.idDemande).subscribe(data=>{
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

  onSubmitRejet(bonEngagement) {
       
    this.demandeCession.bonEngagement= bonEngagement;
    this.recevabiliteService.rejeterRecevabilite(this.demandeCession.idDemande, this.demandeCession).pipe(take(5)).subscribe(data=>{
    })
    
    Swal.fire({
        position: 'center',
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
  onSubmitA(bonEngagement) {
    this.demandeCession.bonEngagement.dateBonEngagement = new Date(this.datepipe.transform(bonEngagement.dateBonEngagement, 'yyyy-MM-dd'));
    this.demandeCession.bonEngagement.dateSoumissionServiceDepensier = new Date(this.datepipe.transform(bonEngagement.dateSoumissionServiceDepensier, 'yyyy-MM-dd'));
       this.demandeCession.bonEngagement= bonEngagement;
    this.recevabiliteService.validerRecevabilite(this.demandeCession.idDemande, this.demandeCession).pipe(take(5)).subscribe(data=>{
    })
    
    Swal.fire({
    position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande de cession est recevable.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color:"#203359",
      confirmButtonColor:"#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      
    }).then(() => {
     
        this.router.navigate(['workstation/cdmp/recevabilite'])
    })


      
}
}
