import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings } from '../workstation/generic/const/apiSettings.const';
import { Utilisateur } from '../workstation/model/utilisateur';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl =ApiSettings.API_CDMP + '/utilisateur'; 
  private pmebuUserUrl =ApiSettings.API_CDMP ; 

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    console.log(credentials.email)
    return this.http.post(this.authUrl + "/auth" , credentials, httpOptions);
  }

  majMDP(utilisateur: Utilisateur):Observable<any>{
    return this.http.patch(this.authUrl +"/update/password",utilisateur, httpOptions);
  }

  recupMDP(email: string){
    const req = new HttpRequest("POST", `${this.authUrl}/forget-password`,email,{
      reportProgress: true,
      responseType: "json"
    });
    console.log(email)
  
    return this.http.request(req);
  }

  getPmebyUser(id):Observable<any>{
    return this.http.get( this.pmebuUserUrl+`/pme/byutilisateur/${id}`, httpOptions);
  }
}
