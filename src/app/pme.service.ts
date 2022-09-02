import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PmeService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getPmes(){ 
       return this.httpClient.get(this.SERVER_URL + 'pmes');
  }

  public getPme(pmeId){
       return this.httpClient.get(`${this.SERVER_URL + 'pmes'}/${pmeId}`); 
  }
  public createPme(pme: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.post(`${this.SERVER_URL + 'pmes'}`, pme)
  }

  public deletePme(pmeId){
      return this.httpClient.delete(`${this.SERVER_URL + 'pmes'}/${pmeId}`)
  }
  public updatePme(pme: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.put(`${this.SERVER_URL + 'pmes'}/${pme.id}`, pme)
  }

}