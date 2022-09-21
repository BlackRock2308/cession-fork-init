import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeCession } from '../../model/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandesCessionService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDemandesCession(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession`);
  }
  getDemandesCessionById(): Observable<DemandeCession[]> {
    return this.http.get<DemandeCession[]>(`${this.baseUrl}/demandes_cession?id=1`);
  }

}

