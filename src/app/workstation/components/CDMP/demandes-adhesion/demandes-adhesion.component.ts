import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-demandes-adhesion',
  templateUrl: './demandes-adhesion.component.html',
  styleUrls: ['./demandes-adhesion.component.scss']
})
export class DemandesAdhesionComponent implements OnInit {

  demandeDialog: boolean;

  demandes: DemandeAdhesion[];

  demande: DemandeAdhesion;

  submitted: boolean;

  cols: any[];

  statuts: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
  items1: MenuItem[];

  activeIndex: number = 1;
  activeItem: MenuItem;
  home: MenuItem;
  nineas:any;
  rangeDates:any[];
  matchModeOptions: SelectItem[];

  constructor(private demandesAdhesionService: DemandesAdhesionService, private messageService: MessageService, private router: Router,
    private breadcrumbService: BreadcrumbService,    private filterService:FilterService

  ) { 
    this.breadcrumbService.setItems([
      { label: 'Liste des demandes' }

  ]);
  this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] })
  }

  ngOnInit() {
    this.calenderFilter()
    console.log(this.rangeDates)
    //this.productDialog = this.communicationService.getDialogObs();
    //this.productService.getProducts().then(data => this.products = data);
    this.demandesAdhesionService.getDemandesAdhesion().subscribe(data => {
      this.demandes = data
      console.log(this.demandes)
      console.log(data)
    //  this.demandes.forEach(element =>element.date_soumission=new Date(element.date_soumission))
      //console.log(this.demandes[0].date_soumission)
    });

    this.cols = [
      { field: 'ninea', header: 'NINEA' },
      { field: 'rccm', header: 'RCCM' },
      { field: 'date_soumission', header: 'Date Soumission' },
      { field: 'statut', header: 'Statut' }
    ];
    this.statuts = [
      {label: 'Soumise', value: 'Soumise'},
      {label: 'Rejetée', value: 'Rejetée'}
  ]
    console.log(this.nineas)
    // this.items1 = [
    //   { label: 'Liste des demandes' }
    // ];


    this.items = [
      {
        label: 'Vérification du NINEA',
        routerLink: 'steps/verification',
      },
      {
        label: 'Compléments',
        routerLink: 'steps/informations_ninea',
      }
    ];

    this.matchModeOptions = [
      { label: 'Intervalle de date', value: 'rangeDate' },
      { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contient', value: FilterMatchMode.CONTAINS },
  ];
  
    this.activeItem = this.items[0];
    this.demandesAdhesionService.getDialog().subscribe(data => this.demandeDialog = data)

  }

  verifierDemande(demande: DemandeAdhesion) {
    this.demande = { ...demande };
    this.demandeDialog = true;
    console.log(demande)
    this.demandesAdhesionService.setDemandeObs(demande);
    this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);


  }

  visualiserDemande(demande: DemandeAdhesion) {
    this.demande = { ...demande };
    //this.demandeDialog = true;
    console.log(demande)
    this.demandesAdhesionService.setDemandeObs(demande);
    this.router.navigate(['workstation/cdmp/visualiser-demandes'], {  queryParams: {  page: 'adhesion' } });
    

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

  //filtre par intervalle de date
  public calenderFilter() {
    
     this.filterService.register('rangeDate' ,(value: any, filter: any): boolean => {
      //Afficher toute les lignes du tableau au démarrage
      if(this.rangeDates== undefined){
        return true;
      }

    //redéfinir les dates pour comparer sans prendre en compte l'heure
     //on donne toutes les date l'heure 00:00:00
      value=new Date((new Date(value)).toDateString())
      this.rangeDates[0]=new Date((new Date(this.rangeDates[0])).toDateString())
      if( this.rangeDates[1] !== null ){
        this.rangeDates[1]=new Date((new Date(this.rangeDates[1])).toDateString())
      }

      if (this.filterService.filters.is(value,this.rangeDates[0]) && this.rangeDates[1] === null) {
        console.log(value)
        console.log(1)
        return true;
    }
   
    if (this.filterService.filters.is(value,this.rangeDates[1])  && this.rangeDates[0] === null) {
      console.log(2)
        return true;
    }
   
    if (this.rangeDates[0] !== null && this.rangeDates[1] !== null &&
      this.filterService.filters.after(value,this.rangeDates[0]) && this.filterService.filters.before(value,this.rangeDates[1])) {
        console.log(3)
        return true;
    }
   
    console.log(5,this.filterService.filters.after(value,this.rangeDates[0]),this.filterService.filters.before(value,this.rangeDates[1]),value,this.rangeDates[0])
    return false;
   })
   }

  clearRange(table){
    this.rangeDates=undefined;
    table.filter()
  }

}
