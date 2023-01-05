import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class FormeJuridiqueService extends GenericService{
  
  private FormeJuridiqueUrl =ApiSettings.API_CDMP + '/formesjuridiques'; 

  constructor(public http:HttpClient) { 
    super(http)
  }

  
  addFormeJuridique(data){
    return this.add(this.FormeJuridiqueUrl,data)
  }

  updateFormeJuridique(data) {
      return this.update(this.FormeJuridiqueUrl, data);
  }

  getAllFormeJuridique() {
      return this.getAll(this.FormeJuridiqueUrl)
  }

  getByFormeJuridiqueId(id){
      return this.getById(this.FormeJuridiqueUrl, id)
  }

  deleteFormeJuridique(id){
      return this.delete(this.FormeJuridiqueUrl,id)
  }

}
