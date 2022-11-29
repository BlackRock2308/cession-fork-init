import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Creance } from 'src/app/workstation/model/creance';
import { Observation } from 'src/app/workstation/model/observation';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';

@Component({
  selector: 'app-details-tableau',
  templateUrl: './details-tableau.component.html',
  styleUrls: ['./details-tableau.component.scss']
})
export class DetailsTableauComponent implements OnInit {

  demandeNantissementInfos: any;
  detailsCreances: Creance;
motif: String ;
  constructor(public ref: DynamicDialogRef,public config: DynamicDialogConfig, private observationService:ObservationService) { }

  ngOnInit() : void {
    this.detailsCreances = this.config.data.demande;
    if(this.detailsCreances.statut.code == 'RISQUEE'){
      this.observationService.getObservationByDemandeCessionANDStatut(this.detailsCreances.idCreance, 'RISQUEE')
      .subscribe((res:Observation) =>{
        this.motif = res.libelle;
      })
    }

  }

  dismiss() {
    this.ref.close();
  }

}