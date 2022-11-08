import { HttpClient ,HttpEvent,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from '../../generic/generic.service';
import { Paiements } from '../../model/paiements';

@Injectable({
  providedIn: 'root'
})
export class PaiementsService extends GenericService{
  private baseUrl = 'http://localhost:3000';
  private paiementUrl= environment.API_CDMP+"paiements"

  constructor(public http: HttpClient) {
    super(http);
  }
  private paiementObs: BehaviorSubject<any> = new BehaviorSubject({
      id: 1,
      referenceBE: "20-117510",
      raisonSocial: "Modelsis SARL",
      ninea: "561205467567",
      totalMarche: "2 000 000",
      statut: "En attente de paiement",
      soldePME: "1 800 000",
      montantRecu: 0,
      referencePaiement: "2022-0001",
      datePaiement: "12/06/2022",
      payer: "Demba Gueye",
      montant: "1.000.000",
      modePaiement: "Virement"
  });
   

  getAllPaiements() {
    return this.getAll(this.paiementUrl);
  }
  getPaiementsById(id){
    return this.getById(this.paiementUrl+"/", id);
  }

 
}

