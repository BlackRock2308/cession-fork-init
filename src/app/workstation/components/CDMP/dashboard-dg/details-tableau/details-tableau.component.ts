import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Creance } from 'src/app/workstation/model/creance';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';

@Component({
  selector: 'app-details-tableau',
  templateUrl: './details-tableau.component.html',
  styleUrls: ['./details-tableau.component.scss']
})
export class DetailsTableauComponent implements OnInit {

  demandeNantissementInfos: any;
  detailsCreances: Creance;

  constructor(public ref: DynamicDialogRef, private demandeAdhesionService: DemandesAdhesionService, public config: DynamicDialogConfig) { }

  ngOnInit() : void {
    console.log('merciiii ' +JSON.stringify( this.config.data.demande))
    this.detailsCreances = this.config.data.demande;

  }

  dismiss() {
    this.ref.close();
  }

}