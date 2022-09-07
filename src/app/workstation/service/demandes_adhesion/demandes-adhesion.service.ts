import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeAdhesion } from '../../model/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandesAdhesionService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  
  getDemandesAdhesion(): Observable<DemandeAdhesion[]> {
    return this.http.get<DemandeAdhesion[]>(`${this.baseUrl}/demandes_adhesion`);
  }
}
