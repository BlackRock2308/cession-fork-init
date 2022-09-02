import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PME } from '../model/pme';

@Injectable({
  providedIn: 'root'
})
export class AdhesionService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  postPME(pme: PME): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/pmes`, pme, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getPMES(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pmes`);
  }
}
