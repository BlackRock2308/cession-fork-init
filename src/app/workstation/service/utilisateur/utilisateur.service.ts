import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../generic/generic.service';
import { ApiSettings } from '../../generic/const/apiSettings.const';
import { Utilisateur } from '../../model/utilisateur';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService extends GenericService {

  private utilisateurUrl = ApiSettings.API_CDMP + '/utilisateur';

  constructor(public http: HttpClient) {
    super(http)

  }

  //Creation d'un utilisateur
  createCompte(utilisateur: any): Observable<Utilisateur> {

    return this.http.post<Utilisateur>(`${this.utilisateurUrl}/pme/createCompte`, utilisateur);

  }
  getByIdemail<T>(id: any): Observable<any> {
    return this.getById(this.utilisateurUrl, id)
  }

  updateUtilisateur(data): Observable<Utilisateur> {
    return this.patch(`${this.utilisateurUrl}/update`, data);
  }

  addUtilisateur(data){
    return this.add(this.utilisateurUrl+'/create', data)
  }

  getAllUtilisateur(){
      return this.getAll(this.utilisateurUrl+'/getAll')
  }

  getAllRoles(){
    return this.getAll(this.utilisateurUrl+'/getAllRoles')
}
}
