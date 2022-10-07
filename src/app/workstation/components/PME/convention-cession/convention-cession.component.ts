import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../../../components/CDMP/visualiser-document/visualiser-document.component';
import { Convention } from '../../../model/convention';
import { DemandeAdhesion } from '../../../model/demande';
import { Documents } from '../../../model/document';
import { DocumentService } from '../../../service/document/document.service';
import { ConventionEnregistreeComponent } from '../../../COMPTABLE_CDMP/convention-enregistree/convention-enregistree.component';
import { EditerConventionComponent } from '../../../COMPTABLE_CDMP/editer-convention/editer-convention.component';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-convention-cession',
  templateUrl: './convention-cession.component.html',
  styleUrls: ['./convention-cession.component.scss'],
  providers: [DialogService]
})
export class ConventionCessionPMEComponent implements OnInit {

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
  profil : string;
  home: MenuItem;
  
  constructor(
    private documentService: DocumentService, 
    public dialogService: DialogService, 
    public messageService: MessageService,
    private pmeService:PmeService,
    private breadcrumbService: BreadcrumbService
    ) { 
      this.breadcrumbService.setItems([
        { label: 'Convention de cession' },
        //{ label: 'Icons', routerLink: ['/utilities/icons'] }
    ]);
      this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })

    }

  ngOnInit() {
    this.profil = localStorage.getItem('profil');
   
    this.pmeService.getConventions().subscribe(data => {
      this.documents = data
      console.log(data)
    });
    

      this.cols = [
        { field: 'nomDocument', header: 'Nom de Document' },
        { field: 'typeDocument', header: 'Type de Document' },
        { field: 'dateSoumission', header: 'Date de Soumission' },
      ];
 
     
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

EditerConvention(convention: Convention) {
  const ref = this.dialogService.open(EditerConventionComponent, {
    data: {
      convention: convention
    },
    header: "",
    width: '55%',
    height: 'calc(65% - 250px)',
    baseZIndex: 50
  });
}
EditConvention(convention: Convention) {
  const ref = this.dialogService.open(EditerConventionComponent, {
    data: {
      convention: convention
    },
    header: "",
    width: '60%',
    height: 'calc(98% - 250px)',
    baseZIndex: 50
  });
}
}
