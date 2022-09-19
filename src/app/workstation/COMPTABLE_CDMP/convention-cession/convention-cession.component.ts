import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../../components/CDMP/visualiser-document/visualiser-document.component';
import { Convention } from '../../model/convention';
import { DemandeAdhesion } from '../../model/demande';
import { Documents } from '../../model/document';
import { DemandesAdhesionService } from '../../service/demandes_adhesion/demandes-adhesion.service';
import { DocumentService } from '../../service/document/document.service';
import { ConventionEnregistreeComponent } from '../convention-enregistree/convention-enregistree.component';

@Component({
  selector: 'app-convention-cession',
  templateUrl: './convention-cession.component.html',
  styleUrls: ['./convention-cession.component.scss'],
  providers: [DialogService]
})
export class ConventionCessionComponent implements OnInit {


  

  demandeDialog: boolean;



  demandes:DemandeAdhesion[];

  demande:DemandeAdhesion;


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
  
  constructor(private documentService: DocumentService,private demandesAdhesionService: DemandesAdhesionService, public dialogService: DialogService,private messageService:MessageService, private router: Router,
    ) { }

  ngOnInit() : void {
   
    this.documentService.getDeocuments().subscribe(data => {
      this.documents = data
    });
    this.demandesAdhesionService.getDemandesAdhesion().subscribe(data=>{
      this.demandes=data});

      this.cols = [
        { field: 'nomDocument', header: 'NomDocument' },
        { field: 'typeDocument', header: 'TypeDocument' },
        { field: 'dateSoumission', header: 'Date Soumission' },
      ];
     
  }

  verifierDemande(demande: DemandeAdhesion) {
    this.demande = {...demande};
    this.demandeDialog = true;
    console.log(demande)
    this.demandesAdhesionService.setDemandeObs(demande);
    //this.router.navigate(['workstation/cdmp/visualiser-demandes']);

    
}






hideDialog() {
    this.demandeDialog = false;
    this.submitted = false;
}

nineaValide():any{
  const targetDiv = document.getElementById("actif");
  const btn = document.getElementById("oui");
  targetDiv.style.display = "flex";

}
visualiserDocument(document: Documents) {
  const ref = this.dialogService.open(VisualiserDocumentComponent, {
    data: {
      document: document
    },
    header: "Convention de Cession",
    width: '70%',
    height: 'calc(100% - 100px)',
    baseZIndex: 10000
  });
}

afterLoadComplete(pdf: any) {
  this.afterpageLoadedCb++;
  this.totalPages = pdf.numPages;
  console.log('after-load-complete', this.totalPages);
}

pageRendered(e: CustomEvent) {
  console.log('(page-rendered)');
}

/**
* Permet d'aller à la page suivante dans le document
*/
nextPage() {
  this.pageVariable++;
}
/**
 * Permet de retourner à la page précédente dans le document
 */
previousPage() {
  if (this.pageVariable > 1) {
    this.pageVariable--;
  }
}

textLayerRendered(e: CustomEvent) {
  // Callback Monitor variable
  this.textLayerRenderedCb++;

  // Finds anchors and sets hrefs void
  console.log('(text-layer-rendered)');

}

/**
* Permet de faire une rotation sur l'affichage du document
*/
rotate() {
  console.log(this.angle);
  if (this.angle === 0) {
    this.angle = 90;
  } else if (this.angle === 90) {
    this.angle = 180;
  } else if (this.angle === 180) {
    this.angle = 0;
  }
}
/**
* Permet de faire un zoom plus sur l'affichage du document
*/
plusZoom() {
  this.zoom = this.zoom + 0.10;
}

minusZoom() {
  if (this.zoom > 0.8) {
    this.zoom = this.zoom - 0.10
  }
}

ChargerConvention(convention: Convention) {
  const ref = this.dialogService.open(ConventionEnregistreeComponent, {
    data: {
      convention: convention
    },
    header: "Charger la convention enregistree",
    width: '40%',
    height: 'calc(40% - 100px)',
    baseZIndex: 50
  });
}
}
