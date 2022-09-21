import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paiements } from '../../model/paiements';

@Injectable({
  providedIn: 'root'
})
export class PaiementsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPaiements(): Observable<Paiements[]> {
    return this.http.get<Paiements[]>(`${this.baseUrl}/paiements`);
  }
  getPaiementsById(): Observable<Paiements[]> {
    return this.http.get<Paiements[]>(`${this.baseUrl}/paiements?id=1`);
  }

}

