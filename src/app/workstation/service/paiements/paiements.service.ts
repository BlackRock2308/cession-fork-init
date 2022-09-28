import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paiements } from '../../model/paiements';

@Injectable({
  providedIn: 'root'
})
export class PaiementsService {
  private baseUrl = 'http://localhost:3000';

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
      datePaiement: "12/05/2022",
      payer: "Abdou Diop",
      montant: "400 000",
      modePaiement: "Chèque"
  });


  constructor(private http: HttpClient) {
  }
   

  getPaiements(): Observable<Paiements[]> {
    return this.http.get<Paiements[]>(`${this.baseUrl}/paiements`);
  }
  getPaiementsById(): Observable<Paiements[]> {
    return this.http.get<Paiements[]>(`${this.baseUrl}/paiements?id=1`);
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

}

