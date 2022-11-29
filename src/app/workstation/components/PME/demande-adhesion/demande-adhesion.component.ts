import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from 'src/app/app.component';
import { FilterMatchMode, FilterService, MenuItem, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/workstation/model/product';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { DemandeAdhesion, DemandeNantissemantInfo } from 'src/app/workstation/model/demande';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { Observable } from 'rxjs';
import { PME } from 'src/app/workstation/model/pme';
import { MenuService } from 'src/app/core/app-layout/side-menu/app.menu.service';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { Observation } from 'src/app/workstation/model/observation';
import { DashboardServices } from 'src/app/workstation/service/dashboard.services';

@Component({
    selector: 'app-demande-adhesion',
    templateUrl: './demande-adhesion.component.html',
    styleUrls: ['./demande-adhesion.component.scss'],
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
    ]
})
export class DemandeAdhesionComponent implements OnInit {

    productDialog: boolean;
    demandes: any[];

    demande: any;
    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    routeItems: MenuItem[];

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

    items: MenuItem[];
    home: MenuItem;

    selectedBONFiles: File | null = null;
    currentFile?: File;
    progress = 0;
    message = '';
    fileInfos?: Observable<any>;
    form!: FormGroup;
    cities: Product[];
    pme: PME;
    idPme: any;

    //basic info as reference BE ninea and date
    basicInfo: DemandeNantissemantInfo;

    rangeDates: any[];
    matchModeOptions: SelectItem[];
    statuts:any[];
    user: any;
    observation:Observation={};
    idPME: any;

    constructor(
        private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder,
        private router: Router, private tokenStorage: TokenStorageService,
        private demandesCessionService: DemandesCessionService,
        private demandesAdhesionService: DemandesAdhesionService,
        public renderer: Renderer2, private menuService: MenuService,
        private primengConfig: PrimeNGConfig,
        public app: AppComponent,
        private filterService:FilterService,
        private dashboardServices: DashboardServices   ) {
        
    this.user = JSON.parse(sessionStorage.getItem("auth-user"));
        this.breadcrumbService.setItems([
            { label: 'Demandes' },
            { label: 'Liste des demandes', routerLink: ['pme/demandes_en_cours'] }

        ]);
        this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['pme/demandes_en_cours'] });

        //filtre par range date
        this.calenderFilter()


        this.matchModeOptions = [
            { label: 'Intervalle de date', value: 'rangeDate' },
            { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
            { label: 'Contient', value: FilterMatchMode.CONTAINS },
        ];
        this.statuts = [
            { label: 'Recevable', value: 'RECEVABLE' },
            { label: 'Complétée', value: 'COMPLETEE' },
            { label: 'Risquée', value: 'RISQUEE' },
            { label: 'Non Risquée', value: 'NON_RISQUEE' },
            { label: 'Complément Requis', value: 'COMPLEMENT_REQUIS' }
        ]


    }
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            ninea: ['', Validators.required],
            nineaFile: ['', Validators.required]

        });
        this.dashboardServices
        .getPMEByUser(this.user.idUtilisateur)
        .subscribe((res: any) => {
          if (res) {
           let idPME = res.idPME;
            this.getDemandeCessionByPME(idPME);
          }
        });
       

        this.primengConfig.ripple = true;

        this.cols = [
            { field: 'reference', header: 'Référence BE' },
            { field: 'nomMarche', header: 'Nom Marché' },
            { field: 'dateDemandeCession', header: 'Date Soumission' },
            { field: 'numeroDemande', header: 'Numéro demande' },
            { field: 'statut', header: 'Statut' },

        ];
    }

    getDemandeCessionByPME(idPME){
        this.demandesCessionService.getDemandesCessionByPme(idPME).subscribe(data => {
            this.demandes = data
            console.log(this.demandes)
        });
    }
    onSubmit() {
        // arrêter si le formulaire est invalide
        if (this.form.invalid) {
            return;
        }

        this.enregistrerBon();

    }
    //sélectionner le fichier du ninea
    selectBONFile(files: any): void {
        this.selectedBONFiles = files.target.files[0];
        console.log(this.selectedBONFiles);
    }

    //ouvrir la boite de dialogue du répertoire
    handleBONClick() {
        document.getElementById('upload-NINEAfile').click();
    }


    //enregistrement du bbn d'engagement avec l'appel du service d'enregistrement
    private enregistrerBon() {
        this.pme = this.form.value;
        this.pme.nineaFile = this.selectedBONFiles;
        //fonction à continuer 
        console.log(this.pme);
        /*this.adhesionService.postPME(this.pme)
            .subscribe(() => {
               })*/

    }

    consulterDemande(demande) {
        this.demande = { ...demande };
        //this.demandeDialog = true;
        console.log(demande)
        this.demandesAdhesionService.setDemandeObs(demande);
        this.router.navigate(['workstation/cdmp/visualiser-demandes'], { queryParams: { page: 'demande cession' } });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.demandes.length; i++) {
            if (this.demandes[i].id === id) {
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

    //récupération des informations de la demandes
    setDemandeInfo(demande: DemandeAdhesion) {
        this.demandesAdhesionService.setDemandenantissementObs(demande);
        console.log(this.demandesAdhesionService.getDemandenantissementObs())
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

