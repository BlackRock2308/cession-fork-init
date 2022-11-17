import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';
import { DemandeCession } from '../../model/demande';
import { StatutEnum } from '../../model/statut-enum';

@Injectable({
  providedIn: 'root'
})
export class DemandesCessionService extends GenericService{
    
    
  private baseUrl = ApiSettings.API_CDMP;

  private cessionObs: BehaviorSubject<any> = new BehaviorSubject({
    id: 1,
    ninea: "567567",
    statut: "Non Risquée",
    raisonSocial: "Modelsis SARL",
    referenceBE: "294067",
    dateDemande: "21/03/2021",
    numeroDemande: "2022-0001",
    nomMarche: "Contruction d'immeuble",
    ATD :"Aucun ATD",
    denomination : "Modelsis SARL",
    nantissement :"Creance  nanti",
    interdiction :"Aucune interdiction bancaire"
  });

  constructor(public http: HttpClient) {
    super(http);
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
  getPageDemandesCession(args:any): Observable<any> {
    return this.getAllPagination(`${this.baseUrl}/demandecession`,args)
  }

  //Demande de cession par statut avec pagination
  getPageDemandeCessionByStatut(args:any): Observable<any> {
    return this.getAllPagination(`${this.baseUrl}/demandecession/bystatut`,args)
}

   //Ajouter une nouvelle demande de cession
public addDemandeCession(demandeCession : any ) : Observable<DemandeCession>{
  
  return this.http.post<DemandeCession>(`${this.baseUrl}/demandecession`, demandeCession);
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

  //patch demande de cession
  patchDemandeCession(id:number,demandeCession:DemandeCession): Observable<HttpEvent<any>> {
    const req = new HttpRequest('PATCH', `${this.baseUrl}/demandes_cession/${id}`,demandeCession, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //get analyse risque
  getAnalyseRisque(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession/analyse_risque`);
  }

  //get demandeCession par statut
  getDemandeCessionByStatut(statut:string): Observable<any> {
      const params = new HttpParams()
      .set('statut',statut)

    return this.http.get<any>(`${this.baseUrl}/demandecession/bystatut`,{params});
  }

  getDemandesCessionByPmeAndStatut(idPME: any, statut: string): Observable<any>  {
    const params = new HttpParams()
    .set('statut',statut)
    .set('pme',idPME)

  return this.http.get<any>(`${this.baseUrl}/demandecession/byStatutAndPme`,{params});  }

  validateAnalyseRisque(id: any) {
    const req = new HttpRequest('PATCH', `${this.baseUrl}/demandecession/${id}/validateAnalyse`,id, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
}

signerConventionPME(codePin : string , idUtilisateur : any , idDemande : any){
  const req = new HttpRequest('POST', `${this.baseUrl}/demandecession/${idDemande}/signer-convention-pme/${idUtilisateur}`,codePin,{
    reportProgress: true,
    responseType: 'json'
  });
  console.log(codePin)

  return this.http.request(req);
}

signerConventionDG(codePin : string , idUtilisateur : any , idDemande : any){
  const req = new HttpRequest('POST', `${this.baseUrl}/demandecession/${idDemande}/signer-convention-dg/${idUtilisateur}`,codePin,{
    reportProgress: true,
    responseType: 'json'
  });
  console.log(codePin)

  return this.http.request(req);
}
rejeterAnalyseRisque(id: any) {
  const req = new HttpRequest('PATCH', `${this.baseUrl}/demandecession/${id}/rejectedAnalyse`,id, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

demanderComplement(id: any) {
  const req = new HttpRequest('PATCH', `${this.baseUrl}/demandecession/${id}/complementAnalyse`,id, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

getDemandesCessionByPme(idPME: any):Observable<any>  {
  
  return this.http.get<any>(`${this.baseUrl}/demandecession/pme/${idPME}`)
}

getPMEBenRejByAnne(anne: any):Observable<any>  {
  
  return this.http.get<any>(`${this.baseUrl}/demandecession/statistiqueDemandeCession/${anne}`)
}

completeDemande(idDemande: number): Observable<any>{
  const req = new HttpRequest('PATCH', `${this.baseUrl}/pme/${idDemande}/complete-demande/`,idDemande, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

updateStatut(idDemande: any,statut:StatutEnum):Observable<any>  {

  const params = new HttpParams()
      .set('statut',statut.toString())

      console.log(params);
      
    return this.http.patch<any>(`${this.baseUrl}/demandecession/${idDemande}/statut`,{},{params});
}

accepterRecevabilite(idDemande: any):Observable<any> {
  return this.http.patch<any>(`${this.baseUrl}/demandecession/${idDemande}/validerRecevabilite`,idDemande);
}
rejeterRecevabilite(idDemande: any):Observable<any> {
  return this.http.patch<any>(`${this.baseUrl}/demandecession/${idDemande}/rejeterRecevabilite`,idDemande);
}


}

