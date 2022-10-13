import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterMatchMode, MenuItem, SelectItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { BonEngagement } from 'src/app/workstation/model/bonEngagement';
import { Convention } from 'src/app/workstation/model/convention';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { PME } from 'src/app/workstation/model/pme';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';

@Component({
  selector: 'app-liste-conventions',
  templateUrl: './liste-conventions.component.html',
  styleUrls: ['./liste-conventions.component.scss']
})
export class ListeConventionsComponent implements OnInit {
  demandes:DemandeCession[];
  items: MenuItem[];
  home:MenuItem;
  cols: any[];
  demande: { id?: number; pme?: PME; referenceBE?: string; raisonSocial?: string; ninea?: string; convention?: Convention; statut?: string; dateDemande?: Date; BE?:BonEngagement; numeroDemande?: number; };

  
  matchModeOptions: SelectItem[];
  statuts:any[];
  constructor(
    private demandesCessionService:DemandesCessionService,
    private router:Router,
    private breadcrumbService: BreadcrumbService

  ) { this.breadcrumbService.setItems([
    { label: 'Liste des demandes de cession' }
]);
this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] });}

  ngOnInit(): void {

    this.demandesCessionService.getConventions().subscribe(data=>{
      this.demandes=data
    })

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
    {label: 'Convention Enregistrée', value: 'convention-enregistrée'},
    {label: 'Convention Rejetée', value: 'convention-rejetée'},
    {label: 'Substitution Effectuée', value: 'substitution-effectuée'},
    {label: 'Convention Acceptée', value: 'convention-acceptée'}
]
  }

  editerDemandeCession(demande: DemandeCession) {
    this.demande = {...demande};
    console.log(demande)
    this.demandesCessionService.setDemandeObs(demande);

    this.router.navigate(['workstation/ordonnateur/conventions/details_convention']);

    
}
}
