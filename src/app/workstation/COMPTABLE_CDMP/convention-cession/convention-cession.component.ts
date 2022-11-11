import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, FilterService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { VisualiserDocumentComponent } from '../../components/CDMP/visualiser-document/visualiser-document.component';
import { Convention } from '../../model/convention';
import { DemandeAdhesion, DemandeCession } from '../../model/demande';
import { Documents } from '../../model/document';
import { DemandesCessionService } from '../../service/demandes_cession/demandes-cession.service';
import { DocumentService } from '../../service/document/document.service';
import { ConventionEnregistreeComponent } from '../convention-enregistree/convention-enregistree.component';
import { ConventionSignerComponent } from '../convention-signer/convention-signer.component';
import { EditerConventionComponent } from '../editer-convention/editer-convention.component';

@Component({
  selector: 'app-convention-cession',
  templateUrl: './convention-cession.component.html',
  styleUrls: ['./convention-cession.component.scss'],
  providers: [DialogService]
})
export class ConventionCessionComponent implements OnInit {

  demandeDialog: boolean;

  demandes:DemandeCession[] = [] ;

  demande:DemandeCession;

  convention: any;

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
  
  matchModeOptions: SelectItem[];
  statuts:any[];
  constructor(
    private documentService: DocumentService, public dialogService: DialogService, public messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    private filterService:FilterService,
    private demandeCessionService : DemandesCessionService

    ) { 
      this.breadcrumbService.setItems([
        { label: 'Convention de cession' },
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] })
    }

  ngOnInit() {
    this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_GENEREE").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes,data.content)
    });
    this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_CORRIGEE").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes)
    });

    this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_SIGNEE_PAR_PME").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes)
    });

    this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_SIGNEE_PAR_DG").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes)
    });

    this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_ACCEPTEE").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes)
    });
    this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_REFUSEE").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes)
    });
    this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_TRANSMISE").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes)
    });
    this.demandeCessionService.getDemandeCessionByStatut("NON_RISQUEE").subscribe(data => {
      this.demandes=this.demandes.concat(data.content)
      console.log(this.demandes)
    });
    this.profil = localStorage.getItem('profil');
   
   

    
      this.cols = [
        { field: 'nomDocument', header: 'Nom de Document' },
        { field: 'typeDocument', header: 'Type de Document' },
        { field: 'dateSoumission', header: 'Date de Soumission' },
      ];

      // this.items = [
      //   { label: 'Convention de cession' },
      // ];
  
      // this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };     
 
      this.matchModeOptions = [
        { label: 'Intervalle de date', value: 'rangeDate' },
        { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
        { label: 'Contient', value: FilterMatchMode.CONTAINS },
    ];
    this.statuts = [
        {label: 'Convention Enregistrée', value: 'CONVENTION_GENEREE'},
        {label: 'Convention Rejetée', value: 'CONVENTION_CORRIGEE'},
        {label: 'Convention Signée par le PME', value: 'CONVENTION_SIGNEE_PAR_PME'},
        {label: 'Convention Signée par le DG', value: 'CONVENTION_SIGNEE_PAR_DG'},
        {label: 'Convention Générée', value: 'CONVENTION_ACCEPTEE'},
        {label: 'Convention Transmise', value: 'CONVENTION_TRANSMISE'},
        {label: 'Convention Générée', value: 'CONVETION_REJETEE'},
        {label: 'Convention Générée', value: 'NON_RISQUEE'}
    ]
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

ChargerConvention(convention: Convention , demande : any) {
  this.demandeCessionService.setDemandeObs(demande)

  const ref = this.dialogService.open(ConventionEnregistreeComponent, {
    data: {
      convention: convention
    },
    header: "Chargement de la convention enregistrée",
    width: '40%',
    height: 'calc(50% - 100px)',
    baseZIndex: 50
  });
}

EditerConvention(convention: Convention) {
 // this.demandeCessionService.setDemandeObs(demande)

  const ref = this.dialogService.open(EditerConventionComponent, {
    data: {
      convention: convention
    },
    header: "Editer la convention",
    width: '40%',
    height: 'calc(50% - 100px)',
    baseZIndex: 50
  });
}
EditConvention(convention: Convention,demande:any) {
  this.demandeCessionService.setDemandeObs(demande)
  const ref = this.dialogService.open(EditerConventionComponent, {
    data: {
      convention: convention
    },
    header: "Editer la convention",
    width: '40%',
    height: 'calc(50% - 100px)',
    baseZIndex: 50
  });
}

dismiss() {
  this.ref.close();
}

signerConvention(demande : any) {
  this.demandeCessionService.setDemandeObs(demande)
  console.log(demande)

  const ref = this.dialogService.open(ConventionSignerComponent, {
    data: {
      convention: this.convention
    },
    header: "Signer la convention",
    width: '50%',
    height: 'calc(50% - 100px)',
    baseZIndex: 50
  });
  this.dismiss();
}


}
