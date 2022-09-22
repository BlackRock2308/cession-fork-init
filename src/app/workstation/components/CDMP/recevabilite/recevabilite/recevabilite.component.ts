import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion, DemandeCession } from 'src/app/workstation/model/demande';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/workstation/model/product';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Router } from '@angular/router';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';


@Component({
  selector: 'app-recevabilite',
  templateUrl: './recevabilite.component.html',
  styleUrls: ['./recevabilite.component.scss']
})
export class RecevabiliteComponent implements OnInit {

  demandes:DemandeCession[];

  demande:DemandeCession;

  submitted: boolean;

  cols: any[];


  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
   


  constructor(private demandesAdhesionService: DemandesAdhesionService,private messageService:MessageService, private router: Router,private demandeCessionService :DemandesCessionService) {}

  ngOnInit() {
    //this.productDialog = this.communicationService.getDialogObs();
      //this.productService.getProducts().then(data => this.products = data);
      this.demandesAdhesionService.getDemandesCession().subscribe(data=>{
    this.demandes=data});
      
      this.cols = [
          {field: 'ninea', header: 'NINEA'},
          {field: 'rccm', header: 'RCCM'},
          {field: 'datesoumission', header: 'Date Soumission'},
          {field: 'raisonSociale', header: 'Raison Sociale'},
          {field: 'refBE', header: 'Reférence du BE'}
      ];
  }





  verifierDemandeCession(demande: DemandeCession) {
      this.demande = {...demande};
      console.log(demande)
      this.demandeCessionService.setDemandeObs(demande);

      this.router.navigate(['workstation/cdmp/recevabilite/verifier']);

      
  }

}
