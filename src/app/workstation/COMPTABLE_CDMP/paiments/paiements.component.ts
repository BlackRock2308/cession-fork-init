import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../../components/CDMP/visualiser-document/visualiser-document.component';
import { Convention } from '../../model/convention';
import { DemandeAdhesion } from '../../model/demande';
import { Documents } from '../../model/document';
import { Paiements } from '../../model/paiements';
import { DemandesAdhesionService } from '../../service/demandes_adhesion/demandes-adhesion.service';
import { DocumentService } from '../../service/document/document.service';
import { PaiementsService } from '../../service/paiements/paiements.service';
import { ConventionEnregistreeComponent } from '../convention-enregistree/convention-enregistree.component';
import { EditerConventionComponent } from '../editer-convention/editer-convention.component';
import { PaiementPMEComponent } from '../paiement-pme/paiement-pme.component';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.scss'],
  providers: [DialogService]
})
export class PaimentsComponent implements OnInit {

  paiementDialog: boolean;

  paiements:Paiements[];

  paiement:Paiements;

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
  
  constructor(private documentService: DocumentService,private paiementsService: PaiementsService, public dialogService: DialogService,private messageService:MessageService, private router: Router,
    ) { }

  ngOnInit() : void {
   
    this.documentService.getDeocuments().subscribe(data => {
      this.documents = data
    });
    this.paiementsService.getPaiements().subscribe(data=>{
      this.paiements=data});

      this.cols = [
        { field: 'raisonSocial', header: 'Raison Social' },
        { field: 'referenceBE', header: 'Référence BE ' },
        { field: 'totalMarche', header: 'Toatal Marché' },
        { field: 'soldePME', header: 'Solde PME' },
        { field: 'montantReçu', header: 'Montant Reçu' },
        { field: 'statut', header: 'Statut' },
      ];
     
  }

  visualiserPaiementListCDMP(paiement: Paiements) {
    this.paiement = {...paiement};
    this.paiementDialog = true;
    this.router.navigate(['workstation/comptable/list-paiements-cdmp']);
    
}
visualiserPaiementListPME(paiement: Paiements) {
  this.paiement = {...paiement};
  this.paiementDialog = true;
  this.router.navigate(['workstation/comptable/list-paiements-pme']);
  
}

hideDialog() {
    this.paiementDialog = false;
    this.submitted = false;
}

nineaValide():any{
  const targetDiv = document.getElementById("actif");
  const btn = document.getElementById("oui");
  targetDiv.style.display = "flex";

}

}
