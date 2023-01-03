import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class ParametrageDecoteServices extends GenericService{
  
  private parametrageDecoteUrl =ApiSettings.API_CDMP + '/decote'; 

  constructor(public http:HttpClient) { 
    super(http)
  }

  
  addParametrageDecote(data){
    return this.add(this.parametrageDecoteUrl,data)
  }

  updateParametrageDecote(data) {
      return this.update(this.parametrageDecoteUrl, data);
  }

  getAllParametrageDecote() {
      return this.getAll(this.parametrageDecoteUrl)
  }

  getByParametrageDecoteId(id){
      return this.getById(this.parametrageDecoteUrl, id)
  }

  deleteParametrageDecote(id){
      return this.delete(this.parametrageDecoteUrl,id)
  }

}
