import { HttpClient ,HttpEvent,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';
import { Paiements } from '../../model/paiements';

@Injectable({
  providedIn: 'root'
})
export class PaiementsService extends GenericService{
  private paiementUrl = ApiSettings.API_CDMP + '/paiements';

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


  constructor(public http: HttpClient) {
    super(http)
     //garder les infos demandes de cession en variable de session au cas où l'on fait un refresh
     try{
      let storedPaiementCession=localStorage.getItem('storedPaiementCession');
      if(storedPaiementCession)
        this.setPaiementObs(JSON.parse(storedPaiementCession));

    }
    catch(e){
      console.error("pas encore de variable de session pour le paiement.Certainement c'est la première connexion")
    }
  }
   

  getPaiements(): Observable<Paiements[]> {
    return this.http.get<Paiements[]>(`${this.paiementUrl}/paiements`);
  }
  getPaiementsPME(): Observable<Paiements[]> {
    return this.http.get<Paiements[]>(`${this.paiementUrl}/listpaiementspme`);
  }
  getPaiementsById(): Observable<Paiements[]> {
    return this.http.get<Paiements[]>(`${this.paiementUrl}/paiements?id=1`);
  }

   //renseigner les informations de paiement  sélectionné
   setPaiementObs(paiement: any) {
    localStorage.setItem('storedPaiementCession',JSON.stringify(paiement));
    this.paiementObs.next(paiement);
  }
  //récupérer les informations de paiement  sélectionné
  getPaiementObs(): Observable<any> {
    return this.paiementObs.asObservable();
  }

  postPaiement(data) {
    let body = JSON.stringify(data);
    return this.add(this.paiementUrl, body);
  }



}

