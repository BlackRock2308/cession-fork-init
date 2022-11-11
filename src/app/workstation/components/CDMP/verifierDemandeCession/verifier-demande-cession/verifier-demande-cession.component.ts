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
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { BonEngagementService } from 'src/app/workstation/service/bonEngagement/bon-engagement.service';

@Component({
  selector: 'app-verifier-demande-cession',
  templateUrl: './verifier-demande-cession.component.html',
  styleUrls: ['./verifier-demande-cession.component.scss'],
  providers: [DialogService, 
    DatePipe]
  
})
export class VerifierDemandeCessionComponent implements OnInit {
  demandeCession: any;
  bonEngagement: BonEngagement;
  documents: any[]=[];
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
    private bonEngagementService: BonEngagementService,
    private recevabiliteService: RecevabiliteService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router:Router,
    private breadcrumbService: BreadcrumbService,
    private pmeService:PmeService
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

      this.documents = this.documents.concat(this.demandeCession.bonEngagement.documents)
      this.documents = this.documents.concat(this.demandeCession.pme.documents)
      this.documents = this.documents.concat(this.demandeCession.documents)


   

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

  async updatePME() {
    this.demandeCession.pme.identificationBudgetaire= this.identifie
    this.demandeCession.pme.atd=this.atd 
    this.demandeCession.pme.interdictionBancaire=this.interdiction

    await this.pmeService.updatePme(this.demandeCession.pme).subscribe()

  }
  
  async rejeterDemande(bonEngagement){
    this.updatePME()
    await this.bonEngagementService.updateBonEngagement(bonEngagement.idBonEngagement,bonEngagement).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.demandeCessionService.rejeterRecevabilite(this.demandeCession.idDemande).subscribe()
      }

    )

     
  }
  async accepterDemande(bonEngagement) {
    this.updatePME()
    await this.bonEngagementService.updateBonEngagement(bonEngagement.idBonEngagement,bonEngagement).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        this.demandeCessionService.accepterRecevabilite(this.demandeCession.idDemande).subscribe()
      }

    )
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
        bonEngagement.dateBonEngagement = new Date(this.datepipe.transform(bonEngagement.dateBonEngagement, 'yyyy-MM-dd'));
        bonEngagement.dateSoumissionServiceDepensier = new Date(this.datepipe.transform(bonEngagement.dateSoumissionServiceDepensier, 'yyyy-MM-dd'));
        this.rejeterDemande(bonEngagement)
        this.router.navigate(['workstation/cdmp/recevabilite'])
        Swal.fire(
            'Rejetée!',
            'La demande a bien été rejetée.',
            'success'
          )
      }})

    }
  onSubmitAccept(bonEngagement) {
    bonEngagement.dateBonEngagement = new Date(this.datepipe.transform(bonEngagement.dateBonEngagement, 'yyyy-MM-dd'));
    bonEngagement.dateSoumissionServiceDepensier = new Date(this.datepipe.transform(bonEngagement.dateSoumissionServiceDepensier, 'yyyy-MM-dd'));
    this.accepterDemande(bonEngagement)

       
    
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
