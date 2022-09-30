import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../../components/CDMP/visualiser-document/visualiser-document.component';
import { Documents } from '../../model/document';
import { Paiements } from '../../model/paiements';
import { DocumentService } from '../../service/document/document.service';
import { PaiementsService } from '../../service/paiements/paiements.service';
import { PaiementCDMPComponent } from '../paiement-cdmp/paiement-cdmp.component';

@Component({
  selector: 'app-list-paiement-cdmp',
  templateUrl: './list-paiement-cdmp.component.html',
  styleUrls: ['./list-paiement-cdmp.component.scss'],
  providers: [DialogService]
})
export class ListPaiementCdmpComponent implements OnInit {

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
  value1: any;
  totalPages: number;
  afterpageLoadedCb = 0;
  pageVariable = 1;
  ref: DynamicDialogRef;
  home: MenuItem;

  constructor(private documentService: DocumentService, private paiementsService: PaiementsService, public dialogService: DialogService, private messageService: MessageService, private router: Router,
  ) { }

  ngOnInit(): void {

    this.documentService.getDeocuments().subscribe(data => {
      this.documents = data
    });
    this.paiementsService.getPaiements().subscribe(data => {
      this.paiements = data
    });

    this.cols = [
      { field: 'referencePaiement', header: 'Référence Paiement' },
      { field: 'datePaiement', header: 'Date Paiement' },
      { field: 'payer', header: 'Payeur' },
      { field: 'montant', header: 'Montant' },
    ];
    this.items = [
      { label: 'Paiements' , url: '/#/workstation/comptable/paiements'},
      { label: 'Paiment CDMP' },
    ];

    this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };

  }

  verifierDemande(paiement: Paiements) {
    this.paiement = { ...paiement };
    this.paiementDialog = true;
    //this.router.navigate(['workstation/cdmp/visualiser-demandes']);

  }

  visualiserPaimentCDMP() {
    const ref = this.dialogService.open(PaiementCDMPComponent, {

      header: "Paiement CDMP",
      width: '50%',
      height: 'calc(90% - 200px)',
      baseZIndex: 10000
    });
  }

  detailPaimentCDMP(document: Documents) {
    let paiement = 'true';
    const ref = this.dialogService.open(VisualiserDocumentComponent, {
      data: {
        document: document,
        paiement: paiement
      },
      header: "Paiement PME",
      width: '60%',
      height: 'calc(100% - 200px)',
      baseZIndex: 10000
    });
  }

}
