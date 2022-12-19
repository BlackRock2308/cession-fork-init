import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
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
import { BonEngagement, Ministere } from '../../../../model/bonEngagement';
import { DatePipe } from '@angular/common';
import { MY_DATE_FORMATS } from 'src/app/workstation/model/my-date-format';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { BonEngagementService } from 'src/app/workstation/service/bonEngagement/bon-engagement.service';
import { Observation } from 'src/app/workstation/model/observation';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';

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
  dateTime = new Date();
  ministeres: Ministere[];
  code: string;

  documents: any[] = [];
  cols: any[];
  pas_identifie: boolean;

  identifie: boolean;
  pas_atd: boolean;
  date10: Date;

  atd: boolean;
  pas_nantissement: boolean;
  pas_interdiction: boolean;
  recevabiliteDemande: any;
  interdiction: boolean;
  nantissement: boolean;
  infosBEForm: any;
  infosBEDialog: boolean = false;
  observation: Observation = {};
  items: MenuItem[];
  home: MenuItem;
  notifier = new HttpHeaderResponse();
  selectedYear: Date;
  submit: boolean = false;
  constructor(
    private demandeCessionService: DemandesCessionService,
    private datepipe: DatePipe,
    private bonEngagementService: BonEngagementService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private pmeService: PmeService,
    private observationService: ObservationService,
    private tokenStorage: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Liste des demandes de cession', routerLink: 'cdmp/recevabilite' },
      { label: 'Recevabilité' }
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
  }

  ngOnInit(): void {
    this.observation.libelle = ''
    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demandeCession = data
      console.log(this.demandeCession)
      this.bonEngagement = this.demandeCession.bonEngagement;
      this.documents = this.documents.concat(this.demandeCession.bonEngagement.documents)
      this.documents = this.documents.concat(this.demandeCession.pme.documents)
      this.documents = this.documents.concat(this.demandeCession.documents)
      console.log(this.documents)

    })

    this.demandeCessionService.getAllMinistere().subscribe(data => {
      this.ministeres = <Ministere[]>data;
    })

    this.cols = [
      { field: 'typeDocument', header: 'Type de document' },
      { field: 'nomDocument', header: 'Nom Document' },
      { field: 'dateSoumission', header: 'Date Soumission' }
    ];

    this.infosBEForm = this.formBuilder.group({
      exercice: ['', Validators.required],
      naturePrestation: ['', Validators.required],
      natureDepense: ['', Validators.required],
      designationBeneficiaire: ['', Validators.required],
      referenceBE: [{ value: this.demandeCession.bonEngagement.reference, disabled: true }],
      imputation: ['', Validators.required],
      modeReglement: ['', Validators.required],
      destinationAction: ['', Validators.required],
      identificationComptable: ['', Validators.required],
      typeDepense: ['', Validators.required],
      objetDepense: ['', Validators.required],
      montantCreance: ['', Validators.required],
      dateBonEngagement: ['', [Validators.required, this.matchValues()]],
      destinationActivite: ['', Validators.required],
      code: ['', Validators.required],
      dateSoumissionServiceDepensier: ['', [Validators.required, this.matchValues()]]

    });
  }
  matchValues(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value <= new Date()
        ? null
        : { isMatching: false };
    };
  }
  get f() {
    return this.infosBEForm.controls;
  }
  async updatePME() {
    let pme = this.demandeCession.pme
    pme.identificationBudgetaire = this.identifie
    pme.atd = this.atd
    pme.interdictionBancaire = this.interdiction
    pme.nantissement = this.nantissement;

    console.log(pme)
    await this.pmeService.updatePme(pme).subscribe(
      (data) => {
        console.log(data);

      }
    )

  }

  async rejeterDemande(bonEngagement) {
    bonEngagement.exercice = this.selectedYear ? this.selectedYear.getFullYear() : '';
    this.updatePME()
    await this.bonEngagementService.updateBonEngagement(bonEngagement.idBonEngagement, bonEngagement).subscribe(
      () => { },
      () => { },
      () => {
        this.demandeCessionService.rejeterRecevabilite(this.demandeCession.idDemande, this.code).subscribe()
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut = {}
        this.observation.demandeid = this.demandeCession.idDemande;
        this.observation.statut.libelle = StatutEnum.rejetee;
        this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
        Swal.fire(
          'Rejetée!',
          'La demande a bien été rejetée.',
          'success'
        )
        this.router.navigate(['workstation/cdmp/recevabilite'])
      }

    )


  }
  async accepterDemande(bonEngagement) {
    console.log('affiche MOI' + this.code)

    bonEngagement.exercice = this.selectedYear.getFullYear();

    this.updatePME()
    await this.bonEngagementService.updateBonEngagement(bonEngagement.idBonEngagement, bonEngagement).subscribe(
      () => { },
      () => { },
      () => {
        this.demandeCessionService.accepterRecevabilite(this.demandeCession.idDemande, this.code).subscribe(
          (response) => { },
          (error) => { },
          () => {
            this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
            this.observation.statut = {}
            this.observation.demandeid = this.demandeCession.idDemande;
            this.observation.statut.libelle = StatutEnum.recevable;
            this.observationService.postObservation(this.observation).subscribe(data => console.log(data))

            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande de cession est recevable à priori.</p><br><p style='font-size: large;font-weight: bold;'></p>",
              color: "#203359",
              confirmButtonColor: "#99CC33",
              confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
              allowOutsideClick: false,

            }).then(() => {

              this.router.navigate(['workstation/cdmp/recevabilite'])
            })
          }

        )

      }

    )
  }

  visualiserDocument(document: Documents) {
    let nom = document.nomDocument;
    const ref = this.dialogService.open(VisualiserDocumentComponent, {
      data: {
        document: document
      },
      header: nom,
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
      color: "#203359",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>Continuer',
      allowOutsideClick: false,
      confirmButtonColor: '#99CC33FF',
      denyButtonColor: '#981639FF',
      cancelButtonColor: '#333366FF'

    }).then((result) => {
      if (result.isConfirmed) {
        bonEngagement.exercice = this.selectedYear ? this.selectedYear.getFullYear() : '';
        bonEngagement.dateBonEngagement = new Date(this.datepipe.transform(bonEngagement.dateBonEngagement, 'yyyy-MM-dd'));
        bonEngagement.dateSoumissionServiceDepensier = new Date(this.datepipe.transform(bonEngagement.dateSoumissionServiceDepensier, 'yyyy-MM-dd'));
        let mergedObj = { ...bonEngagement, ...this.bonEngagement }
        this.code = this.infosBEForm.value['code'];
        console.log(mergedObj, bonEngagement, this.bonEngagement)
        this.rejeterDemande(mergedObj)
        //location.reload()
        //this.router.navigate(['workstation/cdmp/recevabilite'])

      }
    })

  }
  onSubmitAccept(bonEngagement) {
    this.submit = true;
    if (this.infosBEForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Etes-vous sûr de vouloir valider la demande de cession?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Annuler`,
      confirmButtonColor: '#99CC33FF',
      denyButtonColor: '#981639FF',
      cancelButtonColor: '#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        bonEngagement.exercice = this.selectedYear.getFullYear();
        bonEngagement.dateBonEngagement = new Date(this.datepipe.transform(bonEngagement.dateBonEngagement, 'yyyy-MM-dd'));
        bonEngagement.dateSoumissionServiceDepensier = new Date(this.datepipe.transform(bonEngagement.dateSoumissionServiceDepensier, 'yyyy-MM-dd'));
        bonEngagement.montantCreance = this.infosBEForm.value['montantCreance'];
        let mergedObj = { ...bonEngagement, ...this.bonEngagement }
        this.code = this.infosBEForm.value['code'];
        console.log(mergedObj, bonEngagement, this.bonEngagement)
        this.accepterDemande(mergedObj)
      } else if (result.isDenied) {
        Swal.fire('Traitement non effectif!', '', 'info')
      }
    })


  }
getMinistere(code: string){
  this.demandeCessionService.getMinistereByCode(code).subscribe()
}
}
