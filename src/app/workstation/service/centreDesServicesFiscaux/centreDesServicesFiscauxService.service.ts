import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class CentreDesServicesFiscauxService extends GenericService{
  
  private centreDesServicesFiscauxUrl =ApiSettings.API_CDMP + '/centre_des_servicesFiscaux'; 

  constructor(public http:HttpClient) { 
    super(http)
  }

  
  addCentreDesServicesFiscaux(data){
    return this.add(this.centreDesServicesFiscauxUrl,data)
  }

  updateCentreDesServicesFiscaux(data) {
      return this.update(this.centreDesServicesFiscauxUrl, data);
  }

  getAllCentreDesServicesFiscaux() {
      return this.getAll(this.centreDesServicesFiscauxUrl)
  }

  getByCentreDesServicesFiscauxId(id){
      return this.getById(this.centreDesServicesFiscauxUrl, id)
  }

  deleteCentreDesServicesFiscaux(id){
      return this.delete(this.centreDesServicesFiscauxUrl,id)
  }

}
