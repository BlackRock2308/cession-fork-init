import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
  items1: MenuItem[];

  activeIndex: number = 1;
  activeItem: MenuItem;
  home: MenuItem;

  constructor(private demandesAdhesionService: DemandesAdhesionService, private messageService: MessageService, private router: Router,
  ) { }

  ngOnInit() {
    //this.productDialog = this.communicationService.getDialogObs();
    //this.productService.getProducts().then(data => this.products = data);
    this.demandesAdhesionService.getDemandesAdhesion().subscribe(data => {
      this.demandes = data
      console.log(this.demandes[0].date_soumission)
    });

    this.cols = [
      { field: 'ninea', header: 'NINEA' },
      { field: 'rccm', header: 'RCCM' },
      { field: 'date_soumission', header: 'Date Soumission' }
    ];
    this.items1 = [
      { label: 'Liste des demandes' }
    ];

    this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };

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
    this.demandeDialog = true;
    console.log(demande)
    this.demandesAdhesionService.setDemandeObs(demande);
    this.router.navigate(['workstation/cdmp/visualiser-demandes']);


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

}
