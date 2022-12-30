import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class MinistereDepensierService extends GenericService{
  
  private ministereDepensierUrl =ApiSettings.API_CDMP + '/ministeres'; 

  constructor(public http:HttpClient) { 
    super(http)
  }

  
  addMinistereDepensier(data){
    return this.add(this.ministereDepensierUrl,data)
  }

  updateMinistereDepensier(data) {
      return this.update(this.ministereDepensierUrl, data);
  }

  getAllMinistereDepensier() {
      return this.getAll(this.ministereDepensierUrl)
  }

  getByMinistereDepensierId(id){
      return this.getById(this.ministereDepensierUrl, id)
  }

  deleteMinistereDepensier(id){
      return this.delete(this.ministereDepensierUrl,id)
  }

}
