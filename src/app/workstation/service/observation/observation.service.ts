import { HttpClient, HttpParams ,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { GenericService } from '../../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class ObservationService extends GenericService {
  private observationUrl =ApiSettings.API_CDMP + '/observations'; 


  constructor(public http:HttpClient) { 
    super(http)
  }

  postObservation(data) {
    let body = JSON.stringify(data);
    return this.add(this.observationUrl, body);
  }

  addObservation(data){
    return this.add(this.observationUrl+'/rejet-convention', data);
  }

  updateObservation(data) {
    let body = JSON.stringify(data);
    return this.update(this.observationUrl, body);
  }

//get observation  par demande cession et statut
getObservationByDemandeCessionANDStatut(id:number,statut:string): Observable<any> {
  const params = new HttpParams()
  .set('status',statut)

return this.http.get<any>(`${this.observationUrl}/observation-by-demandeid-and-status/${id}`,{params});
}

//get observation  par demande cession et statut
getObservationByDemandeCession(id:number): Observable<any> {
  return this.getAll<any>(`${this.observationUrl}/${id}/demande-cession`);

}
}
