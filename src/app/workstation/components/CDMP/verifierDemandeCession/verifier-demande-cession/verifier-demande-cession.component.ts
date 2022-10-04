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
import { take } from 'rxjs/operators';

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
  home: MenuItem

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
      //natureDepense: ['',Validators.required],
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

    this.recevabiliteDemande = {
      ...{identificationBudgetaire: this.identifie,
        atd: this.atd,
        nantissement: this.nantissement,
        interdictionBancaire: this.interdiction,
        observation: this.observation,
        referenceBE: this.demandeCession.referenceBE,
        statut:"Enregistrée"},
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
    console.log("0");
    this.demandeCessionService.patchDemandeCession(this.demandeCession.id,demande).pipe(take(1)).subscribe(data => {
      console.log("1:",data);
      //cette ligne est à supprimer lorsque l'on fera la connexion avec le back
      this.recevabiliteService.deleteRecevabilite(this.demandeCession.id).pipe(take(1)).subscribe(data=>{
        console.log("done:",data);
        this.router.navigate(['workstation/cdmp/recevabilite/'])
        console.log("done");
      }
        )
    })
  }
  enregistrerTraitementRecevabilite(demande: any) {
   this.demandeCessionService.patchDemandeCession(this.demandeCession.id,demande).pipe(take(1)).subscribe(data=>{
      //ces deux appels suivantes sont à supprimer lorsque l'on fera la connexion avec le back
      this.recevabiliteService.postAnalyseRisque(demande).pipe(take(1)).subscribe(data => {
        this.recevabiliteService.deleteRecevabilite(this.demandeCession.id).pipe(take(1)).subscribe(()=>{
          this.router.navigate(['workstation/cdmp/recevabilite/'])
          console.log("done");

        }
        )
        
    })
      
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
}
