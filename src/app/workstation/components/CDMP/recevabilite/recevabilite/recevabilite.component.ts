import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, FilterMatchMode, FilterService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion, DemandeCession } from 'src/app/workstation/model/demande';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/workstation/model/product';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { RecevabiliteService } from 'src/app/workstation/service/recevabilite/recevabilite.service';
import { RowSizes } from 'src/app/core/generic-component/cdmp-table/row-sizes.model';


@Component({
  selector: 'app-recevabilite',
  templateUrl: './recevabilite.component.html',
  styleUrls: ['./recevabilite.component.scss']
})
export class RecevabiliteComponent implements OnInit {

  demandes: DemandeCession[];

  demande: DemandeCession;

  submitted: boolean;

  cols: any[];
  rowSizes: any = RowSizes;
  totalRecords: number;

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
  home: MenuItem;
  subscribe: any;
  rangeDates: any[];
  matchModeOptions: SelectItem[];

  constructor(private demandesAdhesionService: DemandesAdhesionService,
    private messageService: MessageService,
    private router: Router,
    private demandeCessionService: DemandesCessionService,
    private recevabiliteService: RecevabiliteService,
    private breadcrumbService: BreadcrumbService,
    private filterService: FilterService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Liste des demandes de cession' },
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
  }

  getDemndes(event: LazyLoadEvent = {}) {
    const args = {
      page: event.first / event.rows,
      perPage: event.rows ? event.rows : this.rowSizes.XSMALL,
      orderBy: event.sortField,
      direction: event.sortOrder,
      // search: this.searchText,
    };

    this.recevabiliteService.getRecevabilites(args).subscribe(data => {
      this.demandes = data.content;
      this.totalRecords = data.totalElements;

    });

  }

  ngOnInit() {
    //this.productDialog = this.communicationService.getDialogObs();
    //this.productService.getProducts().then(data => this.products = data);
    //   this.subscribe=this.recevabiliteService.getRecevabilites().subscribe(data=>{
    // this.demandes=data
    // console.log(this.demandes)});

    this.cols = [
      { field: 'ninea', header: 'NINEA' },
      { field: 'rccm', header: 'RCCM' },
      { field: 'datesoumission', header: 'Date Soumission' },
      { field: 'raisonSociale', header: 'Raison Sociale' },
      { field: 'refBE', header: 'Reférence du BE' }
    ];

    //filtre par range date
    this.calenderFilter()


    this.matchModeOptions = [
      { label: 'Intervalle de date', value: 'rangeDate' },
      { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contient', value: FilterMatchMode.CONTAINS },
    ];
  }

  verifierDemandeCession(demande: DemandeCession) {
    this.demande = { ...demande };
    //console.log(demande)
    this.demandeCessionService.setDemandeObs(demande);

    this.router.navigate(['workstation/cdmp/recevabilite/verifier']);


  }

  // ngOnDestroy() {
  //   this.subscribe.unsubscribe();
  // }

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
    this.router.navigate(['workstation/cdmp/consulter_demande'], {  queryParams: {  page: 'demande cession' } });
  }
}
