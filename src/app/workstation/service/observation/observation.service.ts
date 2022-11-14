import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  updateObservation(data) {
    let body = JSON.stringify(data);
    return this.update(this.observationUrl, body);
  }

}
