import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailsPaiement } from 'src/app/workstation/model/detailsPaiements';
import { Paiements } from 'src/app/workstation/model/paiements';
import { PaiementsService } from 'src/app/workstation/service/paiements/paiements.service';

@Component({
  selector: 'app-list-paiements-details',
  templateUrl: './list-paiements-details.component.html',
  styleUrls: ['./list-paiements-details.component.scss']
})
export class ListPaiementsDetailsComponent implements OnInit {

  paiementCession :any;
  paiements:Paiements[];

  paiement:Paiements;
  idPaiement: any;

  constructor(public ref: DynamicDialogRef,private paiementsService: PaiementsService,
    public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.paiementCession=this.config.data
    console.log(this.paiementCession);
    
  }

  dismiss() {
    this.ref.close();
  }

}
