import { HttpClient ,HttpEvent,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsPaiementsService extends GenericService{
  private detailsPaiementUrl= ApiSettings.API_CDMP+'/detailsPaiements';

  constructor(public http: HttpClient) {
    super(http);
  }

  addDetailPaiementPME(data){
    let body = JSON.stringify(data);
   return this.add(this.detailsPaiementUrl+"/cdmp-pme", body);
  }

  addDetailPaiementCDMP(data){
    let body = JSON.stringify(data);
   return this.add(this.detailsPaiementUrl+"/sica-cdmp", body);
  }

  getDetailPaiementPMEByPaiement(id){
   return this.getById(this.detailsPaiementUrl+"/cdmp-pme", id);
  }

  getDetailPaiementCDMPByPaiement(id){
   return this.getById(this.detailsPaiementUrl+"/sica-cdmp", id);
  }

  getAllDetailsPaiements(){
    return this.getAll(this.detailsPaiementUrl);
  }

  getDetailPaiement(id,Type){
    return this.getById(this.detailsPaiementUrl+"/", id);
  }
}