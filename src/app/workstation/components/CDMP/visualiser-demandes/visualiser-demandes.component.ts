import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Documents } from 'src/app/workstation/model/document';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
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
  id : number;
  totalPages: number;
  afterpageLoadedCb = 0;
  pageVariable = 1;
  documents: any[]=[];
  cols: any[];
  items1: MenuItem[];
  home: MenuItem
  ref: DynamicDialogRef;
  demandeNantissementInfos: any;
  demande: any;
  
  demandes: any[]=[];

  detail: any;
  page: any;
  profile: string;
  observationLibelle: string;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private route: ActivatedRoute,
    private demandeAdhesionService: DemandesAdhesionService,
    private breadcrumbService: BreadcrumbService) {
    this.profile = localStorage.getItem('profil');
    if (this.profile === 'PME') {
      this.breadcrumbService.setItems([
        { label: 'Demandes' },
        { label: 'Liste des demandes', routerLink: 'pme/demandes_en_cours' },
        { label: 'Visualisation de la demande' }
      ]);
    }
    else if (this.profile === 'DSEAR') {
      this.breadcrumbService.setItems([
        { label: 'Liste des demandes', routerLink: 'cdmp/demandes_en_cours/steps/verification' },
        { label: 'Visualisation de la demande' }
      ]);
    }
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
  }

  ngOnInit(): void {
    // this.documentService.getDocumentsADH().subscribe(data => {
    //   this.documents = data
    // });

    //récupérer les infos de la page précédente
     this.demandeAdhesionService.getDemandeObs().subscribe(data => {
       this.demande = data;
       
       if(this.demande.documents.length > 0){
        this.documents=this.documents.concat(this.demande.documents)
       }
       if(this.demande.pme.documents.length > 0){
       this.documents=this.documents.concat(this.demande.pme.documents)
       }
       if(this.demande?.bonEngagement?.documents.length > 0){
        this.documents=this.documents.concat(this.demande?.bonEngagement?.documents)
       }

     
     })

    // //recuperer les infos d'une demande d'adhesion
    // this.demandeAdhesionService.getDemandesAdhesionById(this.id).subscribe(data => {
    //   this.demandes = data
    // })

    this.cols = [
      { field: 'nom', header: 'Nom de Document' },
      { field: 'typeDocument', header: 'Type de Document' },
      { field: 'dateSoumission', header: 'Date de Soumission' },
    ];

    //détail à visualiser( page préceédente)
    this.route.queryParams.subscribe(
      params => {
        this.page = params['page'];
      }
    )

  }

  /**
* Permet de recupérer le nombre de page d'un document après son chargement.
*/
  afterLoadComplete(pdf: any) {
    this.afterpageLoadedCb++;
    this.totalPages = pdf.numPages;
  }

  pageRendered(e: CustomEvent) {
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

  }

  /**
* Permet de faire une rotation sur l'affichage du document
*/
  rotate() {
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

  visualiserDocument(document:any) {
    let nom = document.typeDocument;
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