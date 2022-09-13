import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documents } from '../../model/document';

import { Document } from '../../model/document';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  
  getDeocuments(): Observable<Documents[]> {
    return this.http.get<Documents[]>(`${this.baseUrl}/documents`);
  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/document`);
  }

}
