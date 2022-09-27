import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DemandeCession } from '../../model/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandesCessionService {
  private baseUrl = 'http://localhost:3000';

  private cessionObs: BehaviorSubject<any> = new BehaviorSubject({
    id: 1,
    ninea: "567567",
    statut: "Non Risquée",
    raisonSocial: "Modelsis SARL",
    referenceBE: "294067",
    dateDemande: "21/03/2021",
    numeroDemande: "2022-0001"
  });

  constructor(private http: HttpClient) {
    //garder les infos demandes de cession en variable de session au cas où l'on fait un refresh
    try{
      let storedDemandeCession=localStorage.getItem('storedDemandeCession');
      if(storedDemandeCession)
        this.setDemandeObs(JSON.parse(storedDemandeCession));

    }
    catch(e){
      console.error("pas encore de variable de session pour une demande de cession.Certainement c'est la première connexion")
    }
   }

  getDemandesCession(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession`);
  }
  getDemandesCessionById(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession?id=1`);
  }

  //renseigner les informations de la demande de cession sélectionné
  setDemandeObs(demande: any) {
    localStorage.setItem('storedDemandeCession',JSON.stringify(demande));
    this.cessionObs.next(demande);
  }

  //récupérer les informations de la demande de cession sélectionné
  getDemandeObs(): Observable<any> {
    return this.cessionObs.asObservable();
  }

  //récupéreer les demandes de cession au stade de convention par l'ordonnateur
  getConventions(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/conventions`);
  }

  //mettre à jour la demande de cession
  patchConvention(id:number,demandeCession:DemandeCession): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PATCH', `${this.baseUrl}/conventions/${id}`,demandeCession, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}

