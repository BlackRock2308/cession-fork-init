import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';
import { DemandeAdhesion, DemandeCession, DemandeNantissemantInfo } from '../../model/demande';
@Injectable({
  providedIn: 'root'
})
export class DemandesAdhesionService extends GenericService {

  private demandesADHUrl = ApiSettings.API_CDMP + '/demandeadhesion';
  private creancesUrl = ApiSettings.API_CDMP + '/creances';

  private demandeObs: BehaviorSubject<any> = new BehaviorSubject({
    id: 6,
    ninea: "567865467567",
    rccm: "6543568778",
    date_soumission: "12/02/2021",
    ninea_existant: "true",
    pme_active: "false"
  });

  //dialogue
  private dialogObs: BehaviorSubject<any> = new BehaviorSubject(false);

  //localStorage.setItem('storedDemande',JSON.stringify(demandeObs));

  private demandenantissementObs: BehaviorSubject<DemandeNantissemantInfo> = new BehaviorSubject({
    id: 0,
    ninea: "567865467567",
    refBE: "6543568778",
    date_soumission: new Date("2021/02/12"),
    date_cession: "12/12/2020",

    montant_rembourse: "2.000.000",
    solde_PME: "8.000.000",
    montant_debourse: "5.000.000",
    solde_sica: "3.000.000"
  });

  constructor(public http: HttpClient) {
    super(http)
    //garder les infos demandes de cession en variable de session au cas où l'on fait un refresh
    try {
      let storedDemande = localStorage.getItem('storedPaiementCession');
      if (storedDemande)
        this.setDemandeObs(JSON.parse(storedDemande));

    }
    catch (e) {
    }
  }

  // Retourne la liste des demandes d'adhesion
  getDemandesAdhesion(): Observable<any> {
    return this.http.get<any>(`${this.demandesADHUrl}`);
  }

  getPageDemandesAdhesion(args:any): Observable<any> {
    return this.getAllPagination(`${this.demandesADHUrl}`,args)
  }

  getCreances(): Observable<any> {
    return this.http.get<any>(`${this.creancesUrl}`);
  }


  //patch demande adhesion
  validerAdhesion(id: any): Observable<any> {
    const req = new HttpRequest('PATCH', `${this.demandesADHUrl}/${id}/acceptadhesion`, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  rejeterDemande(id: any): Observable<any> {
    const req = new HttpRequest('PATCH', `${this.demandesADHUrl}/${id}/rejectadhesion`, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //get l'ensemble des demandes de cession

  getDemandesCession(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.demandesADHUrl}/demandes_cession`);
  }

  /*//get l'ensemble des demandes d'analyse de risque

  getDemandesAnalyseRisque(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession/analyse_risque`);
  }*/


  getDemandesAdhesionById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.demandesADHUrl}/${id}`);
  }


  //renseigner l'existance du ninea
  patchBasicInformation(id: number, nineaValide: any): Observable<DemandeAdhesion> {
    return this.http.patch<DemandeAdhesion>(`${this.demandesADHUrl}/${id}`, nineaValide)
  }

  //rjeter l'adhesion

  //recupérer(garder) les informations par rapport à une demande
  setDemandenantissementObs(demande) {
    localStorage.setItem('storedNantissement', JSON.stringify(demande));
    this.demandenantissementObs.next(demande);
  }
  getDemandenantissementObs(): Observable<any> {
    return this.demandenantissementObs.asObservable();
  }

  //renseigner les informations de la demande d'adhesion sélectionné
  setDemandeObs(demande: any) {
    localStorage.setItem('storedDemande', JSON.stringify(demande));
    this.demandeObs.next(demande);
  }

  //récupérer les informations de la demande d'adhesion sélectionné
  getDemandeObs(): Observable<any> {
    return this.demandeObs.asObservable();
  }

  //mettre à jour les informations de la pme
  patchDemande(id: number, demande: any): Observable<DemandeAdhesion> {
    return this.http.patch<DemandeAdhesion>(`${this.demandesADHUrl}/demandes_adhesion/${id}`, demande)
  }

  //Ajout d'une demande d'adhésion
  createDemandeADH(data) {

    let body = JSON.stringify(data);
    return this.add(this.demandesADHUrl, body);
  }



  // boîte dedialogue
  setDialog(bol: boolean) {
    this.dialogObs.next(bol)
  }
  getDialog() {
    return this.dialogObs.asObservable();
  }
}


export interface BasicInfo {
  id?: number;
  nineaValide?: boolean;
  pmeActive?: boolean;


}

