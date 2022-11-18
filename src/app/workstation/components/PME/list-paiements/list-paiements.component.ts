import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { DetailsPaiement } from 'src/app/workstation/model/detailsPaiements';
import { Paiements } from 'src/app/workstation/model/paiements';
import { DetailsPaiementsService } from 'src/app/workstation/service/paiements/details-paiements.services';
import { PaiementsService } from 'src/app/workstation/service/paiements/paiements.service';
import { ListPaiementsDetailsComponent } from '../list-paiements-details/list-paiements-details.component';
import { PaiementsComponent } from '../paiements/paiements.component';

@Component({
  selector: 'app-list-paiements',
  templateUrl: './list-paiements.component.html',
  styleUrls: ['./list-paiements.component.scss'],
  providers: [DialogService]

})
export class ListPaiementsComponent implements OnInit {

  paiementDialog: boolean;

  paiements:Paiements[];

  paiement:Paiements;

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
   
  activeIndex: number = 1;
  documents: any[];
  
  angle = 0;
  zoom = 0.8;
  textLayerRenderedCb = 0;
  value1: any;
  totalPages: number;
  afterpageLoadedCb = 0;
  pageVariable = 1;
  home: MenuItem;
  idPaiement: any;
  detailsPaiements: DetailsPaiement[];
  
  constructor(private paiementsService: PaiementsService, public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService ,
    private route: ActivatedRoute, private router:Router,
    private detailsPaiementsService: DetailsPaiementsService
  ) {
    this.route.params.subscribe(
      (params: Params) => (this.idPaiement = params["idPaiement"])
    );
      this.breadcrumbService.setItems([
        { label: 'Paiements' , routerLink: ['pme/paiements']},
        { label: 'Liste des paiements' },
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['pme/demandes_en_cours'] })
     }

  ngOnInit(): void {

      this.cols = [
        
        { field: 'datePaiement', header: 'Date Paiement' },
        { field: 'payer', header: 'Enregistré par' },
        { field: 'montant', header: 'Montant' },
        { field: 'modePaiement', header: 'Mode Paiement' },
      ];  
      this.getAllDetailPaiements();
      this.getPaiement();
  }
  getAllDetailPaiements() {
    this.detailsPaiementsService.getDetailPaiementPMEByPaiement(this.idPaiement)
    .subscribe((res:DetailsPaiement[]) =>{
      this.detailsPaiements = res;
    })
  }

  getPaiement() {
    this.paiementsService.getPaiementsById(this.idPaiement)
    .subscribe((res:Paiements) =>{
      this.paiement= res;
      console.log(this.paiement);
      
    })
  }
  visualiserDetails(paiement: DetailsPaiement) {
    //this.paiement = {...paiement};
    //console.log(demande)
    //this.paiementsService.setPaiementObs(paiement);
    const ref = this.dialogService.open(ListPaiementsDetailsComponent, {
        data: {
            paiement: paiement
        },
        header: "Détails du paiement",
        width: '40%',
        height: 'calc(80% - 100px)',
        baseZIndex: 10000
    });

}

}
