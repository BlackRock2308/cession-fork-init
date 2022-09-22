import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Paiements } from 'src/app/workstation/model/paiements';
import { PaiementsService } from 'src/app/workstation/service/paiements/paiements.service';

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
  ref: DynamicDialogRef;
  home: MenuItem;
  
  constructor(private paiementsService: PaiementsService, public dialogService: DialogService) { }

  ngOnInit(): void {

    this.paiementsService.getPaiements().subscribe(data=>{
      this.paiements=data});

      this.cols = [
        
        { field: 'datePaiement', header: 'Date Paiement' },
        { field: 'payer', header: 'Payeur' },
        { field: 'montant', header: 'Montant' },
        { field: 'modePaiement', header: 'Mode Paiement' },
      ];
      this.items = [
        { label: 'Paiements' }
      ];
  
      this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };
  
  }

}
