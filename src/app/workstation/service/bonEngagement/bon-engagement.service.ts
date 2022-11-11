import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { BonEngagement } from '../../model/bonEngagement';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonEngagementService {
  

  private baseUrl = ApiSettings.API_CDMP;


  constructor(private http : HttpClient) { }

    //Ajouter un nouveau bon engagement
public addBE(bonEngagement : BonEngagement) : Observable<BonEngagement>{
  return this.http.post<BonEngagement>(`${this.baseUrl}/bonEngagement`, bonEngagement);
}

updateBonEngagement(idBonEngagement: any, bonEngagement: any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/bonEngagement/${idBonEngagement}`, bonEngagement);
}


}
