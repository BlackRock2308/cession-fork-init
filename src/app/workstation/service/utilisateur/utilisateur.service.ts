import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/generic.service';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import {Utilisateur} from '../../model/utilisateur';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService extends GenericService {

  private utilisateurUrl =ApiSettings.API_CDMP + '/utilisateur'; 

  constructor(public http : HttpClient) { 
    super(http)


   
  }

   //Creation d'un utilisateur
   createCompte(utilisateur : any): Observable<Utilisateur>{

    return this.http.post<Utilisateur>(`${this.utilisateurUrl}/pme/createCompte`, utilisateur);

  }
}
