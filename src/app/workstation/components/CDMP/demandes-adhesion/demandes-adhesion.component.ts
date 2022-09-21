import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/workstation/model/product';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-demandes-adhesion',
  templateUrl: './demandes-adhesion.component.html',
  styleUrls: ['./demandes-adhesion.component.scss']
})
export class DemandesAdhesionComponent implements OnInit {



  demandeDialog: boolean;



  demandes:DemandeAdhesion[];

  demande:DemandeAdhesion;


  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
   
  activeIndex: number = 1;
  activeItem: MenuItem;


  constructor(private demandesAdhesionService: DemandesAdhesionService,private messageService:MessageService, private router: Router,
              ) {}

  ngOnInit() {
    //this.productDialog = this.communicationService.getDialogObs();
      //this.productService.getProducts().then(data => this.products = data);
      this.demandesAdhesionService.getDemandesAdhesion().subscribe(data=>{
    this.demandes=data});
      
      this.cols = [
          {field: 'ninea', header: 'NINEA'},
          {field: 'rccm', header: 'RCCM'},
          {field: 'datesoumission', header: 'Date Soumission'},
          {field: 'rating', header: 'Reviews'},
          {field: 'inventoryStatus', header: 'Status'}
      ];


    this.items = [
    {
        label: 'Vérification du NINEA',
        routerLink: 'steps/verification',
    },
    {
        label: 'Informations',
        routerLink: 'steps/informations_ninea',
    }
];  
    this.activeItem=this.items[0];
    this.demandesAdhesionService.getDialog().subscribe(data=>this.demandeDialog=data)
      
  }





  verifierDemande(demande: DemandeAdhesion) {
      this.demande = {...demande};
      this.demandeDialog = true;
      console.log(demande)
      this.demandesAdhesionService.setDemandeObs(demande);

      this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);

      
  }



  


  hideDialog() {
      this.demandeDialog = false;
      this.submitted = false;
  }

  nineaValide():any{
    const targetDiv = document.getElementById("actif");
    const btn = document.getElementById("oui");
    targetDiv.style.display = "flex";
  
}

}
