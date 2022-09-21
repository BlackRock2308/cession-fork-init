import { Component, OnInit } from '@angular/core';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';

@Component({
  selector: 'app-details-tableau',
  templateUrl: './details-tableau.component.html',
  styleUrls: ['./details-tableau.component.scss']
})
export class DetailsTableauComponent implements OnInit {

  demandeNantissementInfos:any;

  constructor(private demandeAdhesionService:DemandesAdhesionService) { }

  ngOnInit() {
  


  //récupérer les informations du nantissement en cours de modification
  this.demandeAdhesionService.getDemandenantissementObs().subscribe(data=>this.demandeNantissementInfos=data);
  console.log(this.demandeNantissementInfos)
}

}