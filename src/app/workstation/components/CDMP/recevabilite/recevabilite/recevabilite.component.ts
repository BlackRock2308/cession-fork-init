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
import { RecevabiliteService } from 'src/app/workstation/service/recevabilite/recevabilite.service';


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
  home: MenuItem;
  subscribe: any;
   


  constructor(private demandesAdhesionService: DemandesAdhesionService,
    private messageService:MessageService,
     private router: Router,
     private demandeCessionService :DemandesCessionService,
     private recevabiliteService:RecevabiliteService,
     private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        { label: 'Liste des demandes de cession' },
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] })
     }

  ngOnInit() {
    //this.productDialog = this.communicationService.getDialogObs();
      //this.productService.getProducts().then(data => this.products = data);
      this.subscribe=this.recevabiliteService.getRecevabilites().subscribe(data=>{
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
      //console.log(demande)
      this.demandeCessionService.setDemandeObs(demande);

      this.router.navigate(['workstation/cdmp/recevabilite/verifier']);

      
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

}
