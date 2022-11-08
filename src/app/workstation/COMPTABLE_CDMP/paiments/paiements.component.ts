import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterMatchMode, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Documents } from '../../model/document';
import { Paiements } from '../../model/paiements';
import { DocumentService } from '../../service/document/document.service';
import { PaiementsService } from '../../service/paiements/paiements.service';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.scss'],
  providers: [DialogService]
})
export class PaimentsComponent implements OnInit {

  paiementDialog: boolean;

  paiements: Paiements[];

  paiement: Paiements;

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];

  activeIndex: number = 1;
  documents: any[];

  angle = 0;
  zoom = 0.8;
  textLayerRenderedCb = 0;
  selectedDocuments: Documents[];
  value1: any;
  totalPages: number;
  afterpageLoadedCb = 0;
  pageVariable = 1;
  ref: DynamicDialogRef;

  home: MenuItem;

  ;

  matchModeOptions: SelectItem[];
  statuts:any[];

  constructor(private documentService: DocumentService,
     private paiementsService: PaiementsService,
      public dialogService: DialogService,
       private messageService: MessageService,
        private router: Router,
        private breadcrumbService: BreadcrumbService

  ) {this.breadcrumbService.setItems([
    { label: 'Paiements/Recouvrements' }
]);
this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] }); }

  ngOnInit(): void {

    this.documentService.getDeocuments().subscribe(data => {
      this.documents = data
    });
    this.cols = [
      { field: 'raisonSocial', header: 'Raison Social' },
      { field: 'referenceBE', header: 'Référence BE ' },
      { field: 'totalMarche', header: 'Toatal Marché' },
      { field: 'soldePME', header: 'Solde PME' },
      { field: 'montantReçu', header: 'Montant Reçu' },
      { field: 'statut', header: 'Statut' },
    ];

    this.matchModeOptions = [
      { label: 'Intervalle de date', value: 'rangeDate' },
      { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contient', value: FilterMatchMode.CONTAINS },
  ];
  this.statuts = [
      {label: 'En attente de paiement', value: 'en-attente-de-paiement'},
      {label: 'PME partiellement payée', value: 'pme-partiellement-payée'},
      {label: 'PME totalement payée', value: 'pme-totalement-payée'}
  ]
  
  this.getAllPaiement();
  }

  getAllPaiement(){
    this.paiementsService.getAllPaiements().subscribe((data:Paiements[]) => {
      this.paiements = data
    });
  }

  visualiserPaiementListCDMP(paiement: Paiements) {
    this.paiement = { ...paiement };
    this.paiementDialog = true;
    this.router.navigate(['workstation/comptable/list-paiements-cdmp',this.paiement.idPaiement]);

  }
  visualiserPaiementListPME(paiement: Paiements) {
    this.paiement = { ...paiement };
    this.paiementDialog = true;
    this.router.navigate(['workstation/comptable/list-paiements-pme',this.paiement.idPaiement]);

  }

  hideDialog() {
    this.paiementDialog = false;
    this.submitted = false;
  }

  nineaValide(): any {
    const targetDiv = document.getElementById("actif");
    const btn = document.getElementById("oui");
    targetDiv.style.display = "flex";

  }

}
