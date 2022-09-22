import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Documents } from 'src/app/workstation/model/document';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { VisualiserDocumentComponent } from '../visualiser-document/visualiser-document.component';

@Component({
  selector: 'app-visualiser-demandes',
  templateUrl: './visualiser-demandes.component.html',
  styleUrls: ['./visualiser-demandes.component.scss'],
  providers: [DialogService]
})
export class VisualiserDemandesComponent implements OnInit {

  angle = 0;
  zoom = 0.8;
  textLayerRenderedCb = 0;
  selectedDocuments: Documents[];
  value1: any;
  totalPages: number;
  afterpageLoadedCb = 0;
  pageVariable = 1;
  documents: any[];
  cols: any[];
  ref: DynamicDialogRef;
  demandeNantissementInfos: any;

  constructor( private documentService: DocumentService, public dialogService: DialogService, public messageService: MessageService ,private demandeAdhesionService:DemandesAdhesionService) { }

  ngOnInit(): void {
    this.documentService.getDeocuments().subscribe(data => {
      this.documents = data
    });

    this.cols = [
      { field: 'nomDocument', header: 'Nom de Document' },
      { field: 'typeDocument', header: 'Type de Document' },
      { field: 'dateSoumission', header: 'Date de Soumission' },
    ];

    //récupérer les informations du nantissement en cours de modification
  this.demandeAdhesionService.getDemandenantissementObs().subscribe(data=>this.demandeNantissementInfos=data);
  console.log(this.demandeNantissementInfos)
  
  }

  /**
* Permet de recupérer le nombre de page d'un document après son chargement.
*/
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
  /**
 * Permet de faire un zoom moins sur l'affichage du document
 */
  minusZoom() {
    if (this.zoom > 0.8) {
      this.zoom = this.zoom - 0.10
    }
  }
}