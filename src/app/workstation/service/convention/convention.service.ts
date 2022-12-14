import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';
import { DemandeAdhesion } from '../../model/demande';

@Injectable({
  providedIn: 'root'
})
export class ConventionService extends GenericService {
  
  private conventionUrl =ApiSettings.API_CDMP + '/conventions'; 


  constructor(public http:HttpClient) { 
    super(http)
  }

  patchStatutDemande(id:number,statut:any):Observable<DemandeAdhesion>{
    return this.http.patch<DemandeAdhesion>(`${this.conventionUrl}/demandes_adhesion/${id}`,statut)
  }

  getConventions():Observable<any[]>{
    return this.http.get<any[]>(`${this.conventionUrl}/conventionsPME`);
  }

  postConvention(data) {

    let body = JSON.stringify(data);
    return this.add(this.conventionUrl, body);
  }


  updateConvention(data , id : number) {

    let body = JSON.stringify(data);
    return this.update(`${this.conventionUrl}/${id}`, body);
  }

  updateDecote(idConvention: number, decote: number) {
    return this.update(`${this.conventionUrl}/valeurCreance/${idConvention}`,decote);
  }

  corrigerConvention(data){
    return this.update(this.conventionUrl+'/correction',data)
  }

  transmettreConvention(data,id:number):Observable<any>{
    return this.update(`${this.conventionUrl}/transmission/${id}`,data)
  }

  signerConventionPME(codePin : string , idUtilisateur : any , idConvention : any){

    return this.add( `${this.conventionUrl}/${idConvention}/signer-convention-pme/${idUtilisateur}`,codePin)
  }
  
  signerConventionDG(codePin : string , idUtilisateur : any , idConvention : any){
    return this.add( `${this.conventionUrl}/${idConvention}/signer-convention-dg/${idUtilisateur}`,codePin)
    
  }
  

}
