import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class PaiementsService extends GenericService{
  private paiementUrl= ApiSettings.API_CDMP+'/paiements'

  constructor(public http: HttpClient) {
    super(http);
  }

  
  getAllPaiements() {
    return this.getAll(this.paiementUrl);
  }
  getPaiementsById(id){
    return this.getById(this.paiementUrl, id);
  }

  postPaiement(data){
    let body = JSON.stringify(data);
   return this.add(this.paiementUrl , body);
  }

  getPaiementsByIdPME(id){
    return this.getById(`${this.paiementUrl}/bypme`, id);
  }
 
}

