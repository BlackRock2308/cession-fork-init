import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DemandeAdhesion, DemandeCession, DemandeNantissemantInfo } from '../../model/demande';
import { ApiSettings } from '../../generic/const/apiSettings.const';
@Injectable({
  providedIn: 'root'
})
export class DemandesAdhesionService {
  private baseUrl = ApiSettings.API_CDMP;

  private demandeObs: BehaviorSubject<any> = new BehaviorSubject({
    id: 6,
    ninea: "567865467567",
    rccm: "6543568778",
    date_soumission: "12/02/2021",
    ninea_existant:"true",
    pme_active:"false"
  });

  //dialogue
  private dialogObs: BehaviorSubject<any> = new BehaviorSubject(false);

  //localStorage.setItem('storedDemande',JSON.stringify(demandeObs));

private demandenantissementObs: BehaviorSubject<DemandeNantissemantInfo> = new BehaviorSubject({
  id: 0,
  ninea: "567865467567",
  refBE: "6543568778",
  date_soumission: new Date("2021/02/12") ,
  date_cession: "12/12/2020" ,

  montant_rembourse : "2.000.000",
  solde_PME : "8.000.000",
  montant_debourse : "5.000.000",
  solde_sica : "3.000.000"  
});

  constructor(private http: HttpClient) { 
    //garder les infos demandes de cession en variable de session au cas où l'on fait un refresh
    try{
      let storedDemande=localStorage.getItem('storedPaiementCession');
      if(storedDemande)
        this.setDemandeObs(JSON.parse(storedDemande));

    }
    catch(e){
      console.error("pas encore de variable de session pour le paiement.Certainement c'est la première connexion")
    }
  }

  // Retourne la liste des demandes d'adhesion
  getDemandesAdhesion(): Observable<DemandeAdhesion[]> {
    return this.http.get<DemandeAdhesion[]>(`${this.baseUrl}/demandeadhesion`);
  }

  //get l'ensemble des demandes de cession

  getDemandesCession(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession`);
  }

  /*//get l'ensemble des demandes d'analyse de risque

  getDemandesAnalyseRisque(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession/analyse_risque`);
  }*/


  getDemandesAdhesionById(): Observable<DemandeAdhesion[]> {
    return this.http.get<DemandeAdhesion[]>(`${this.baseUrl}/demandes_adhesion?id=1`);
  }

  //renseigner l'existance du ninea
  patchBasicInformation(id:number,nineaValide:any):Observable<DemandeAdhesion>{
    return this.http.patch<DemandeAdhesion>(`${this.baseUrl}/demandes_adhesion/${id}`,nineaValide)
  }
  //recupérer(garder) les informations par rapport à une demande
  setDemandenantissementObs(demande: DemandeNantissemantInfo) {
    localStorage.setItem('storedNantissement',JSON.stringify(demande));
    this.demandenantissementObs.next(demande);
}
getDemandenantissementObs(): Observable<DemandeNantissemantInfo> {
  return this.demandenantissementObs.asObservable();
}

//renseigner les informations de la demande d'adhesion sélectionné
setDemandeObs(demande: any) {
  localStorage.setItem('storedDemande',JSON.stringify(demande));
  this.demandeObs.next(demande);
}

//récupérer les informations de la demande d'adhesion sélectionné
getDemandeObs(): Observable<any> {
  return this.demandeObs.asObservable();
}

//mettre à jour les informations de la pme
patchDemande(id:number,demande:any):Observable<DemandeAdhesion>{
  return this.http.patch<DemandeAdhesion>(`${this.baseUrl}/demandes_adhesion/${id}`,demande)
}



// boîte dedialogue
setDialog(bol:boolean){
  this.dialogObs.next(bol)
}
getDialog(){
  return this.dialogObs.asObservable();
}
}


export interface BasicInfo{
  id?:number;
  nineaValide?:boolean;
  pmeActive?:boolean;

  
}

