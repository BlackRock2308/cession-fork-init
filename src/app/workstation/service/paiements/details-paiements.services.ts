import { HttpClient ,HttpEvent,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsPaiementsService extends GenericService{
  private baseUrl = 'http://localhost:3000';
  private detailsPaiementUrl= environment.API_CDMP+"detailsPaiements"

  constructor(public http: HttpClient) {
    super(http);
  }

  addDetailPaiementPME(data){
    let body = JSON.stringify(data);
   return this.add(this.detailsPaiementUrl+"/pme", body);
  }

  addDetailPaiementCDMP(data){
    let body = JSON.stringify(data);
   return this.add(this.detailsPaiementUrl+"/cdmp", body);
  }

  getDetailPaiementPMEByPaiement(id){
   return this.getById(this.detailsPaiementUrl+"/pme", id);
  }

  getDetailPaiementCDMPByPaiement(id){
   return this.getById(this.detailsPaiementUrl+"/cdmp", id);
  }

  getAllDetailsPaiements(){
    return this.getAll(this.detailsPaiementUrl);
  }

  getDetailPaiement(id,Type){
    return this.getById(this.detailsPaiementUrl+"/", id);
  }
}