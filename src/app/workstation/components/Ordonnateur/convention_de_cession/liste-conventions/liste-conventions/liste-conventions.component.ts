import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterMatchMode, MenuItem, SelectItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { BonEngagement } from 'src/app/workstation/model/bonEngagement';
import { Convention } from 'src/app/workstation/model/convention';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { PME } from 'src/app/workstation/model/pme';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';

@Component({
  selector: 'app-liste-conventions',
  templateUrl: './liste-conventions.component.html',
  styleUrls: ['./liste-conventions.component.scss']
})
export class ListeConventionsComponent implements OnInit {

  demandes:DemandeCession[] = [] ;

  demande:DemandeCession;
  items: MenuItem[];
  home:MenuItem;
  cols: any[];

  
  matchModeOptions: SelectItem[];
  statuts:any[];
  page: any;
  paramStatuts: any[];
  constructor(
    private demandeCessionService:DemandesCessionService,
    private router:Router,
    private breadcrumbService: BreadcrumbService

  ) { this.breadcrumbService.setItems([
    { label: 'Liste des demandes de cession' }
]);
this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] });}

  ngOnInit() {

    this.paramStatuts=[StatutEnum.ConventionAcceptee,StatutEnum.conventionGeneree,StatutEnum.conventionCorrigee,StatutEnum.conventionSigneeParPME,StatutEnum.conventionSigneeParDG,StatutEnum.ConventionRejetee,StatutEnum.ConventionTransmise]
    this.initGetDemandes(this.paramStatuts)
   
    // this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_GENEREE").subscribe(data => {
    //   this.demandes=this.demandes.concat(data.content)
    //   console.log(this.demandes,data.content)
    // });
    // this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_CORRIGEE").subscribe(data => {
    //   this.demandes=this.demandes.concat(data.content)
    //   console.log(this.demandes)
    // });

    // this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_SIGNEE_PAR_PME").subscribe(data => {
    //   this.demandes=this.demandes.concat(data.content)
    //   console.log(this.demandes)
    // });

    // this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_SIGNEE_PAR_DG").subscribe(data => {
    //   this.demandes=this.demandes.concat(data.content)
    //   console.log(this.demandes)
    // });

    // this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_ACCEPTEE").subscribe(data => {
    //   this.demandes=this.demandes.concat(data.content)
    //   console.log(this.demandes)
    // });
    // this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_REFUSEE").subscribe(data => {
    //   this.demandes=this.demandes.concat(data.content)
    //   console.log(this.demandes)
    // });
    // this.demandeCessionService.getDemandeCessionByStatut("CONVENTION_TRANSMISE").subscribe(data => {
    //   this.demandes=this.demandes.concat(data.content)
    //   console.log(this.demandes)
    // });
    

    this.cols=[
      {field: 'ninea', header: 'NINEA'},
      {field: 'statut', header: 'Statut'},
      {field: 'raisonSociale', header: 'Raison Sociale'},
      {field: 'refBE', header: 'Reférence du BE'}
  ];

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

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages

    let statutsParam
  if(Array.isArray(this.paramStatuts)){
    statutsParam=this.paramStatuts.join(",")
  }
  else
    statutsParam=this.paramStatuts
    const args = {
      page: event.page,
      size: event.rows,
      sort:"dateDemandeCession,DESC",
      statut:statutsParam
      
      // search: this.searchText,
    };
    this.demandeCessionService.getPageDemandeCessionByStatut(args).subscribe(data => {
      this.demandes = data.content
      this.page=data      
    });
}

initGetDemandes(statuts:StatutEnum[]){
  let statutsParam
  if(Array.isArray(statuts)){
    statutsParam=statuts.join(",")
  }
  else
    statutsParam=statuts
    const args = {
      page: 0,
      size: 5,
      sort:"dateDemandeCession,DESC",
      statut:statutsParam
      
      // search: this.searchText,
    };
    this.demandeCessionService.getPageDemandeCessionByStatut(args).subscribe(data => {
      this.demandes = data.content
      this.page=data      
    });
  
  
}

  editerDemandeCession(demande: DemandeCession) {
   // this.demande = {...demande};
    console.log(demande)
    this.demandeCessionService.setDemandeObs(demande);

    this.router.navigate(['workstation/ordonnateur/conventions/details_convention']);

    
}
}
