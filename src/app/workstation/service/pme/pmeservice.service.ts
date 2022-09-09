import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PmeService {
  private baseUrl = 'http://localhost:3000';


  constructor(private http:HttpClient) { }
  getProducts() {
    throw new Error('Method not implemented.');
  }

  getTypesDocument(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/types_document`);
  }
}
