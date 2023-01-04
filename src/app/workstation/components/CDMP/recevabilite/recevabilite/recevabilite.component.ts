import { Component, OnInit } from '@angular/core';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { RecevabiliteService } from 'src/app/workstation/service/recevabilite/recevabilite.service';
import { RowSizes } from 'src/app/core/generic-component/cdmp-table/row-sizes.model';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';

@Component({
  selector: 'app-recevabilite',
  templateUrl: './recevabilite.component.html',
  styleUrls: ['./recevabilite.component.scss']
})
export class RecevabiliteComponent implements OnInit {

  demandes: any[];

  demande: any;

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
  page: any={};
  statuts:any[];
  paramStatuts:any[];
  paramStatutsInit:any[];
  defaultRows:number;
  


  constructor(
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
    //location.reload()
  }

 
  ngOnInit() {
    this.paramStatutsInit = [StatutEnum.recevable, StatutEnum.rejetee,StatutEnum.soumise]
    this.paramStatuts = this.paramStatutsInit
    this.initGetDemandes(this.paramStatuts)

    this.cols = [
  
      { field: 'dateDemandeCession', header: 'Date de demande' },
      { field: 'raisonSocial', header: 'Raison Sociale' },
      { field: 'nomMarche', header: 'Nom marché' },
      { field: 'reference', header: 'Reférence du BE' },
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
      {label: 'Soumise', value: 'SOUMISE'},
      {label: 'Rejetée', value: 'REJETEE'},
      {label: 'Recevable', value: 'RECEVABLE'}
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
    this.page=args
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
  this.page=args
  this.demandeCessionService.getPageDemandeCessionByStatut(args).subscribe(data => {
    this.demandes = data.content
    this.totalRecords=data.totalElements
  });


}

filterStatus(event){
  if(event.value)
    this.paramStatuts=[event.value]
  else
    this.paramStatuts=this.paramStatutsInit
  this.initGetDemandes(this.paramStatuts)

  
}
OnPageEvent(){
  this.defaultRows=5;
}
  verifierDemandeCession(demande: DemandeCession) {
    this.demande = { ...demande };
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
        return true;
      }

      if (this.filterService.filters.is(value, this.rangeDates[1]) && this.rangeDates[0] === null) {
        return true;
      }

      if (this.rangeDates[0] !== null && this.rangeDates[1] !== null &&
        this.filterService.filters.after(value, this.rangeDates[0]) && this.filterService.filters.before(value, this.rangeDates[1])) {
        return true;
      }

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
    this.demandeCessionService.setDemandeObs(demande);
    this.router.navigate(['workstation/cdmp/consulter_demande'], {  queryParams: {  page: 'demande cession' } });
  }
}
