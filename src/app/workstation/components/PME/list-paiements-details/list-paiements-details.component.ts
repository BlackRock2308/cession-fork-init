import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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

  constructor(public ref: DynamicDialogRef,private paiementsService: PaiementsService) { }

  ngOnInit(): void {
    // this.paiementsService.getPaiementObs().subscribe(data=>{
    //   this.paiementCession=data
    //   console.log(this.paiementCession)
    // })

  }

  dismiss() {
    this.ref.close();
  }

}
