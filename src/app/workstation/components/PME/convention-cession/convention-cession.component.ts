import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, FilterService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../../../components/CDMP/visualiser-document/visualiser-document.component';
import { Convention } from '../../../model/convention';
import { DemandeAdhesion, DemandeCession } from '../../../model/demande';
import { Documents } from '../../../model/document';
import { ConventionEnregistreeComponent } from '../../../COMPTABLE_CDMP/convention-enregistree/convention-enregistree.component';
import { EditerConventionComponent } from '../../../COMPTABLE_CDMP/editer-convention/editer-convention.component';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ConventionSignerComponent } from 'src/app/workstation/COMPTABLE_CDMP/convention-signer/convention-signer.component';
import { SignerconventionPMEComponent } from '../signer-convention/signerconvention-pme/signerconvention-pme.component';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { Observation } from 'src/app/workstation/model/observation';

@Component({
  selector: 'app-convention-cession',
  templateUrl: './convention-cession.component.html',
  styleUrls: ['./convention-cession.component.scss'],
  providers: [DialogService]
})
export class ConventionCessionPMEComponent implements OnInit {

  demandeDialog: boolean;

  demandes: any[] = [];

  demande: any;

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];

  activeIndex: number = 1;
  documents: any[];
  convention: any;

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

  rangeDates: any[];
  matchModeOptions: SelectItem[];
  statuts: any[];

  observation: Observation = {};

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private tokenStorage: TokenStorageService,
    private breadcrumbService: BreadcrumbService,
    private filterService: FilterService,
    private demandesCessionService: DemandesCessionService,


  ) {
    this.breadcrumbService.setItems([
      { label: 'Convention de cession' },
      //{ label: 'Icons', routerLink: ['/utilities/icons'] }
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })

  }

  ngOnInit() {
    this.profil = localStorage.getItem('profil');

    // this.pmeService.getConventions().subscribe(data => {
    //   this.documents = data
    //   console.log( JSON.stringify(data))
    // });


    this.getDemandes()



    this.cols = [
      { field: 'nomDocument', header: 'Nom de Document' },
      { field: 'typeDocument', header: 'Type de Document' },
      { field: 'dateSoumission', header: 'Date de Soumission' },
    ];

    //filtre par range date
    this.calenderFilter()


    this.matchModeOptions = [
      { label: 'Intervalle de date', value: 'rangeDate' },
      { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contient', value: FilterMatchMode.CONTAINS },
    ];
    this.statuts = [
      { label: 'Convention Soumise', value: 'CONVENTION_SOUMISE' },
      { label: 'Convention Rejetée', value: 'CONVENTION_REJETEE' },
      { label: 'Convention Signée par la PME', value: 'CONVENTION_SIGNEE_PAR_PME' },
      { label: 'Convention Signée par le DG', value: 'CONVENTION_SIGNEE_PAR_DG' },
      { label: 'Convention Acceptée', value: 'CONVENTION_ACCEPTEE' },
      { label: 'Convention Générée', value: 'CONVENTION_GENEREE' }
    ]


  }

  getDemandes() {
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "NON_RISQUE").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_SIGNEE_PAR_PME").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_SIGNEE_PAR_DG").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_ACCEPTEE").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_REJETEE").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });

    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_CORRIGEE").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });

    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_TRANSMISE").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_REJETEE_PAR_PME").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_REJETEE_PAR_DG").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
    this.demandesCessionService.getDemandesCessionByPmeAndStatut(this.tokenStorage.getPME().idPME, "CONVENTION_GENEREE").subscribe(data => {
      this.demandes = this.demandes.concat(data.content)
    });
  }

  dismiss() {
    this.ref.close();
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



  //filtre par intervalle de date
  public calenderFilter() {

    this.filterService.register('rangeDate', (value: any, filter: any): boolean => {
      //Afficher toute les lignes du tableau au démarrage
      if (this.rangeDates == undefined) {
        return true;
      }
      //redéfinir les dates pour comparer sans prendre en compte l'heure
      //on donne toutes les date l'heure 00:00:00
      const d = value.split("/")
      value = new Date((new Date(d[2], d[1] - 1, d[0])).toDateString())
      this.rangeDates[0] = new Date((new Date(this.rangeDates[0])).toDateString())
      if (this.rangeDates[1] !== null) {
        this.rangeDates[1] = new Date((new Date(this.rangeDates[1])).toDateString())
      }

      if (this.filterService.filters.is(value, this.rangeDates[0]) && this.rangeDates[1] === null) {
        console.log(value)
        console.log(1)
        return true;
      }

      if (this.filterService.filters.is(value, this.rangeDates[1]) && this.rangeDates[0] === null) {
        console.log(2)
        return true;
      }

      if (this.rangeDates[0] !== null && this.rangeDates[1] !== null &&
        this.filterService.filters.after(value, this.rangeDates[0]) && this.filterService.filters.before(value, this.rangeDates[1])) {
        console.log(3)
        return true;
      }

      console.log(5, this.filterService.filters.after(value, this.rangeDates[0]), this.filterService.filters.before(value, this.rangeDates[1]), value, this.rangeDates[0])
      return false;
    })
  }

  //effacer le filtre par date
  clearRange(table) {
    this.rangeDates = undefined;
    table.filter()
  }
}
