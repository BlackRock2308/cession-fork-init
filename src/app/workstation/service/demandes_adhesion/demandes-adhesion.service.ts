import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DemandeAdhesion } from '../../model/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandesAdhesionService {
  private baseUrl = 'http://localhost:3000';

  private demandeObs: BehaviorSubject<DemandeAdhesion> = new BehaviorSubject({
    "id": 6,
    "ninea": "567865467567",
    "rccm": "6543568778",
    "date_soumission": "2021-02-12",
    "ninea_file":"",
    "rccm_file":""   
});

  constructor(private http: HttpClient) { }

  
  getDemandesAdhesion(): Observable<DemandeAdhesion[]> {
    return this.http.get<DemandeAdhesion[]>(`${this.baseUrl}/demandes_adhesion`);
  }
  getDemandesAdhesionById(): Observable<DemandeAdhesion[]> {
    return this.http.get<DemandeAdhesion[]>(`${this.baseUrl}/demandes_adhesion?id=1`);
  }

  patchBasicInformation(id:number,basicInfo:BasicInfo):Observable<DemandeAdhesion>{
    return this.http.patch<DemandeAdhesion>(`${this.baseUrl}/demandes_adhesion/${id}`,basicInfo)
  }

  setDemandeObs(demande: DemandeAdhesion) {
    this.demandeObs.next(demande);
}
getDemandeObs(): Observable<DemandeAdhesion> {
  return this.demandeObs.asObservable();
}
}
export class BasicInfo{
  id?:number=0;
  nineaExistant?:boolean=false;
  pmeActive?:boolean=false;
}

