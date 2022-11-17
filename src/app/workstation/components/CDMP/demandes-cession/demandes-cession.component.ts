import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';

@Component({
  selector: 'app-demandes-cession',
  templateUrl: './demandes-cession.component.html',
  styleUrls: ['./demandes-cession.component.scss']
})
export class DemandesCessionComponent implements OnInit {

  demandeDialog: boolean;

  demandes: DemandeCession[];

  demande: DemandeCession;

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];

  activeIndex: number = 1;

  constructor(private demandesCessionService: DemandesCessionService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.demandesCessionService.getDemandesCession().subscribe(data => {
      this.demandes = data
    });

    

    this.cols = [
      { field: 'ninea', header: 'NINEA' },
      { field: 'raisonSocial', header: 'Raison Social' },
      { field: 'referenceBE', header: 'Référence BE' },
      { field: 'numeroDemande', header: 'Numéro Demande' },
      { field: 'statut', header: 'Statut' }
    ];
  }

  hideDialog() {
    this.demandeDialog = false;
    this.submitted = false;
  }

}
