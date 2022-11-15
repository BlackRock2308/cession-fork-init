import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiSettings } from "../generic/const/apiSettings.const";
import { GenericService } from "../generic/generic.service";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class DashboardServices extends GenericService {
    private apiUrl = ApiSettings.API_CDMP;
    private documentFileUrl = ApiSettings.API_CDMP + '/documents/file?path'
  
    constructor(public http: HttpClient) {
      super(http);
    }

    getStatistiqueDemandeCession(annee:number){
        return this.getById(this.apiUrl+'/demandecession/statistiqueDemandeCession', annee)
    }

    getStatistiquePaiementCDMP(annee:number){
        return this.getById(this.apiUrl+'/paiements/getStatistiquePaiementCDMP', annee)
    }

    getStatistiqueAllPaiementPME(annee:number){
        return this.getById(this.apiUrl+'/paiements/getStatistiqueAllPaiementPME', annee)
    }

    getStatistiquePaiementByPME(annee:any, idPME: any){
        return this.getAll(this.apiUrl+'/paiements/getStatistiquePaiementByPME/'+annee+'/'+idPME)
    }

}
  