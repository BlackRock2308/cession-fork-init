import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://10.42.1.131:8081/api/utilisateur';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    console.log(credentials.email)
    return this.http.post(AUTH_API+"/auth" , credentials, httpOptions);
  }

  majMDP(password):Observable<any>{
    return this.http.patch(AUTH_API+"/update",password, httpOptions);
  }

  recupMDP(email):Observable<any>{
    return this.http.post(AUTH_API+"/forget-password",email, httpOptions);
  }

  getPmebyUser(id):Observable<any>{
    return this.http.get(`http://10.42.1.131:8081/api/pme/byutilisateur/${id}`, httpOptions);
  }
}
