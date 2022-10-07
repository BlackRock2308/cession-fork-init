import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { ConventionEnregistreeComponent } from 'src/app/workstation/COMPTABLE_CDMP/convention-enregistree/convention-enregistree.component';
import { EditerConventionComponent } from 'src/app/workstation/COMPTABLE_CDMP/editer-convention/editer-convention.component';
import { Convention } from 'src/app/workstation/model/demande';
import { Documents } from 'src/app/workstation/model/document';
import { Paiements } from 'src/app/workstation/model/paiements';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { PaiementsService } from 'src/app/workstation/service/paiements/paiements.service';

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.scss'],
  providers: [DialogService]

})
export class PaiementsComponent implements OnInit {

  paiementDialog: boolean;

  paiements:Paiements[];

  paiement:Paiements;

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
  home: MenuItem
   
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
  constructor(private documentService: DocumentService,private paiementsService: PaiementsService, public dialogService: DialogService,
    private messageService:MessageService, private router: Router, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Paiements' },
  ]);
  this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['pme/demandes_en_cours'] })
   }

  ngOnInit(): void {
    this.documentService.getDeocuments().subscribe(data => {
      this.documents = data
    });
    this.paiementsService.getPaiements().subscribe(data=>{
      this.paiements=data});

      this.cols = [
        { field: 'raisonSocial', header: 'Raison Social' },
        { field: 'refBE', header: 'Référence BE ' },
        { field: 'total_marche', header: 'Toatal Marché' },
        { field: 'soldePME', header: 'Solde PME' },
        { field: 'montantReçu', header: 'Montant Reçu' },
        { field: 'statut', header: 'Statut' },
        { field: 'decote', header: 'Décote' },
      ];
  
  }

  visualiserListPaiement(paiement: Paiements) {
    this.paiement = {...paiement};
    this.paiementDialog = true;
    this.router.navigate(['workstation/pme/list-paiements']);
    
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
