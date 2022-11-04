import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { Documents } from '../../model/document';

import { Document } from '../../model/document';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = ApiSettings.API_CDMP;
  constructor(private http: HttpClient) { }

  
  getDeocuments(): Observable<Documents[]> {
    return this.http.get<Documents[]>(`${this.baseUrl}/documents`);
  }

    //Ajouter un document
public addDocument(document : Document) : Observable<Document>{
  return this.http.post<Document>(`${this.baseUrl}/documents`, document);
}

  getDocumentsOrd(): Observable<Documents[]> {
    return this.http.get<Documents[]>(`${this.baseUrl}/documentsORD`);
  }

  getDeocumentVRF(): Observable<Documents[]> {
    return this.http.get<Documents[]>(`${this.baseUrl}/documentsVRF`);
  }

  getDocumentsADH(): Observable<Documents[]> {
    return this.http.get<Documents[]>(`${this.baseUrl}/documentADH`);
  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.baseUrl}/document`);
  }

}

