import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationService, FilterMatchMode, FilterService, LazyLoadEvent, MenuItem, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from 'src/app/core/app-layout/side-menu/app.menu.service';
import { Product } from 'src/app/workstation/model/product';
import { DemandeAdhesion, DemandeCession } from 'src/app/workstation/model/demande';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';

@Component({
  selector: 'app-analyse-risque',
  templateUrl: './analyse-risque.component.html',
  styleUrls: ['./analyse-risque.component.scss'],
  animations: [
    trigger('mask-anim', [
      state('void', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 0.8
      })),
      transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
    ])
  ],
  providers: [DialogService]
})
export class AnalyseRisqueComponent implements OnInit {

  demandes: any[] = [];

  demande: any;



  productDialog: boolean;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  routeItems: MenuItem[];

  activeItem: number;
  rightPanelClick: boolean;

  rightPanelActive: boolean;

  menuClick: boolean;

  staticMenuActive: boolean;

  menuMobileActive: boolean;

  megaMenuClick: boolean;

  megaMenuActive: boolean;

  megaMenuMobileClick: boolean;

  megaMenuMobileActive: boolean;

  topbarItemClick: boolean;

  topbarMobileMenuClick: boolean;

  topbarMobileMenuActive: boolean;

  sidebarActive: boolean;

  activeTopbarItem: any;

  topbarMenuActive: boolean;

  menuHoverActive: boolean;

  configActive: boolean;
  isAuthenticated: boolean;
  items: MenuItem[];
  home: MenuItem;
  rangeDates: any[];
  matchModeOptions: SelectItem[];
  statuts: any[];
  paramStatuts: any[];
  page: any;

  constructor(
    private router: Router,
    private demandeCessionService: DemandesCessionService, private messageService: MessageService, private menuService: MenuService,
   
    private breadcrumbService: BreadcrumbService,
    private primengConfig: PrimeNGConfig, public app: AppComponent,
    private filterService: FilterService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Analyse du risque' }
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
  }

  ngOnInit() {
    this.paramStatuts = [StatutEnum.recevable, StatutEnum.completee, StatutEnum.complementRequis, StatutEnum.risquee, StatutEnum.nonRisquee]
    this.initGetDemandes(this.paramStatuts)

    this.primengConfig.ripple = true;
    this.cols = [
      { field: 'ninea', header: 'NINEA' },
      { field: 'rccm', header: 'RCCM' },
      { field: 'datesoumission', header: 'Date Soumission' },
      { field: 'statut', header: 'Statut' }
    ];

    //filtre par range date
    this.calenderFilter()

    this.matchModeOptions = [
      { label: 'Intervalle de date', value: 'rangeDate' },
      { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contient', value: FilterMatchMode.CONTAINS },
    ];
    this.statuts = [
      { label: 'En cours de traitement', value: 'RECEVABLE' },
      { label: 'Risquée', value: 'RISQUEE' },
      { label: 'Complément Requis', value: 'COMPLEMENT_REQUIS' },
      { label: 'Non Risquée', value: 'NON_RISQUEE' },
      { label: 'Complétée', value: 'COMPLETEE' }
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

  filterByStatus(event) {
    if (event.value) {
      let statutsParam = event.value
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
    else
      this.paginate(event)

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  nineaValide(): any {
    const targetDiv = document.getElementById("actif");
    const btn = document.getElementById("oui");
    targetDiv.style.display = "flex";

  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.rightPanelClick) {
      this.rightPanelActive = false;
    }

    if (!this.megaMenuClick) {
      this.megaMenuActive = false;
    }

    if (!this.megaMenuMobileClick) {
      this.megaMenuMobileActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal()) {
        this.menuService.reset();
      }

      if (this.menuMobileActive) {
        this.menuMobileActive = false;
      }

      this.menuHoverActive = false;
    }

    this.menuClick = false;
    this.topbarItemClick = false;
    this.megaMenuClick = false;
    this.megaMenuMobileClick = false;
    this.rightPanelClick = false;
  }

  onMegaMenuButtonClick(event) {
    this.megaMenuClick = true;
    this.megaMenuActive = !this.megaMenuActive;
    event.preventDefault();
  }

  onMegaMenuClick(event) {
    this.megaMenuClick = true;
    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.rightPanelActive = !this.rightPanelActive;

    event.preventDefault();
  }

  onRightPanelClose(event) {
    this.rightPanelActive = false;
    this.rightPanelClick = false;

    event.preventDefault();
  }

  onRightPanelClick(event) {
    this.rightPanelClick = true;

    event.preventDefault();
  }

  onTopbarMobileMenuButtonClick(event) {
    this.topbarMobileMenuClick = true;
    this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

    event.preventDefault();
  }

  onMegaMenuMobileButtonClick(event) {
    this.megaMenuMobileClick = true;
    this.megaMenuMobileActive = !this.megaMenuMobileActive;

    event.preventDefault();
  }

  onMenuClick() {
    this.menuClick = true;
  }
  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isMobile()) {
      this.menuMobileActive = !this.menuMobileActive;
    }

    event.preventDefault();
  }

  onSidebarClick(event: Event) {
    this.menuClick = true;
  }

  onToggleMenuClick(event: Event) {
    this.staticMenuActive = !this.staticMenuActive;
    event.preventDefault();
  }

  onRippleChange(event) {
    this.app.ripple = event.checked;
    this.primengConfig = event.checked;
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

  isHorizontal() {
    return this.app.horizontalMenu === true;
  }

  pmeInfo(demande: any) {
    //this.demande = {...demande};
    console.log(demande)
    this.demandeCessionService.setDemandeObs(demande);

    this.router.navigate(['workstation/cdmp/analyser']);


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
      value = new Date((new Date(value)).toDateString())
      this.rangeDates[0] = new Date((new Date(this.rangeDates[0])).toDateString())
      if (this.rangeDates[1] !== null) {
        this.rangeDates[1] = new Date((new Date(this.rangeDates[1])).toDateString())
      }

      console.log(this.filterService.filters.is(value, this.rangeDates[0]))
      //comparaison et filtre
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

  consulterDemande(demande) {
    this.demande = { ...demande };
    //this.demandeDialog = true;
    console.log(demande)
    this.demandeCessionService.setDemandeObs(demande);
    this.router.navigate(['workstation/cdmp/consulter_demande'], { queryParams: { page: 'demande cession' } });
  }
}


