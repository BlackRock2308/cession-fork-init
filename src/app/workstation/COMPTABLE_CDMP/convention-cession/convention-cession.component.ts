import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, FilterService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { VisualiserDocumentComponent } from '../../components/CDMP/visualiser-document/visualiser-document.component';
import { Convention } from '../../model/convention';
import { DemandeAdhesion, DemandeCession } from '../../model/demande';
import { Document, Documents } from '../../model/document';
import { StatutEnum } from '../../model/statut-enum';
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

  demandes: DemandeCession[] = [];

  demande: DemandeCession;
  documentConvention: Document;

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
  profil: string;
  home: MenuItem;

  matchModeOptions: SelectItem[];
  statuts: any[];
  paramStatuts: any[];
  page: any;
  constructor(
    private documentService: DocumentService, public dialogService: DialogService, public messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    private filterService: FilterService,
    private demandeCessionService: DemandesCessionService

  ) {
    this.breadcrumbService.setItems([
      { label: 'Convention de cession' },
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
  }

  ngOnInit() {

    this.paramStatuts = [StatutEnum.ConventionAcceptee, StatutEnum.conventionGeneree, StatutEnum.conventionCorrigee, StatutEnum.conventionSigneeParPME, StatutEnum.conventionSigneeParDG, StatutEnum.ConventionTransmise, StatutEnum.ConventionRejeteeParPME, StatutEnum.ConventionRejeteeParDG, StatutEnum.ConventionRejetee, StatutEnum.nonRisquee]

    this.initGetDemandes(this.paramStatuts)

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
      { label: 'Convention Enregistrée', value: 'CONVENTION_GENEREE' },
      { label: 'Convention Rejetée', value: 'CONVENTION_CORRIGEE' },
      { label: 'Convention Signée par le PME', value: 'CONVENTION_SIGNEE_PAR_PME' },
      { label: 'Convention Signée par le DG', value: 'CONVENTION_SIGNEE_PAR_DG' },
      { label: 'Convention Générée', value: 'CONVENTION_ACCEPTEE' },
      { label: 'Convention Transmise', value: 'CONVENTION_TRANSMISE' },
      { label: 'Convention Rejetée', value: 'CONVETION_REJETEE' },
      { label: 'Convention Rejetée par PME', value: 'CONVETION_REJETEE_PAR_PME' },
      { label: 'Convention Rejetée par DG', value: 'CONVETION_REJETEE_PAR_DG' },
    ]
  }

  paginate(event) {

    let statutsParam
    if (Array.isArray(this.paramStatuts)) {
      statutsParam = this.paramStatuts.join(",")
    }
    else
      statutsParam = this.paramStatuts
    const args = {
      page: event.page,
      size: event.rows,
      sort: "dateDemandeCession,DESC",
      statut: statutsParam

      // search: this.searchText,
    };
    this.demandeCessionService.getPageDemandeCessionByStatut(args).subscribe(data => {
      this.demandes = data.content
      this.page = data
    });
  }

  initGetDemandes(statuts: StatutEnum[]) {
    let statutsParam
    if (Array.isArray(statuts)) {
      statutsParam = statuts.join(",")
    }
    else
      statutsParam = statuts
    const args = {
      page: 0,
      size: 5,
      sort: "dateDemandeCession,DESC",
      statut: statutsParam

      // search: this.searchText,
    };
    this.demandeCessionService.getPageDemandeCessionByStatut(args).subscribe(data => {
      this.demandes = data.content
      this.page = data
    });
  }

  hideDialog() {
    this.demandeDialog = false;
    this.submitted = false;
  }

  nineaValide(): any {
    const targetDiv = document.getElementById("actif");
    const btn = document.getElementById("oui");
    targetDiv.style.display = "flex";

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

  editConvention(demande) {
    const ref = this.dialogService.open(EditerConventionComponent, {
      data: {
        demande: demande
      },
      header: "Editer la convention",
      width: '70%',
      //height: 'calc(50% - 100px)',
      baseZIndex: 50
    });
  }

  corrigerConvention(demande) {
    const ref = this.dialogService.open(EditerConventionComponent, {
      data: {
        demande: demande
      },
      header: "Corriger la convention",
      width: '70%',
      //height: 'calc(50% - 100px)',
      baseZIndex: 50
    });
  }


  minusZoom() {
    if (this.zoom > 0.8) {
      this.zoom = this.zoom - 0.10
    }
  }

  chargerConvention(demande: any) {

    const ref = this.dialogService.open(ConventionEnregistreeComponent, {
      data: {
        demande: demande
      },
      header: "Chargement de la convention transmise",
      width: '40%',
      height: 'calc(50% - 100px)',
      baseZIndex: 50
    });
    this.dismiss();
    
    this.initGetDemandes(this.paramStatuts);
  }

  visualiserDocument(demande: any) {    
    const ref = this.dialogService.open(VisualiserDocumentComponent, {
      data: {
        demande: demande,
        document: demande.conventions[0].documents[demande.conventions[0].documents.length-1]
      },
      header: "Convention de Cession",
      width: '70%',
      height: 'calc(100% - 100px)',
      baseZIndex: 10000
    });
  }


  dismiss() {
    this.ref.close();
  }



}
