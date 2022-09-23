import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DemandeCession } from 'src/app/workstation/model/demande';
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
  demande: { id?: number; pme?: import("c:/Users/conta/Desktop/Modelsis/Projects/CDMP/cdmp-ui/src/app/workstation/model/pme").PME; referenceBE?: string; raisonSocial?: string; ninea?: string; convention?: import("c:/Users/conta/Desktop/Modelsis/Projects/CDMP/cdmp-ui/src/app/workstation/model/demande").Convention; statut?: string; dateDemande?: Date; BE?: import("c:/Users/conta/Desktop/Modelsis/Projects/CDMP/cdmp-ui/src/app/workstation/model/bonEngagement").BonEngagement; numeroDemande?: number; };

  constructor(
    private demandesCessionService:DemandesCessionService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.demandesCessionService.getConventions().subscribe(data=>{
      this.demandes=data
    })
    this.items = [
      { label: 'Liste des demandes de cession' },
    ];

    this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };

    this.cols=[
      {field: 'ninea', header: 'NINEA'},
      {field: 'statut', header: 'Statut'},
      {field: 'raisonSociale', header: 'Raison Sociale'},
      {field: 'refBE', header: 'Reférence du BE'}
  ];
  }

  editerDemandeCession(demande: DemandeCession) {
    this.demande = {...demande};
    console.log(demande)
    this.demandesCessionService.setDemandeObs(demande);

    this.router.navigate(['workstation/ordonnateur/conventions/details_convention']);

    
}
}
