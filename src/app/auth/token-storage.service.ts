import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PME_KEY = 'pme-user';
const IS_AUTHENTICATED='is-auth';
const HOPE_PAGE='home_page';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
    this.authenticate(false)
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public savePME(pme) {
    console.log(pme)
    window.sessionStorage.removeItem(PME_KEY);
    window.sessionStorage.setItem(PME_KEY, JSON.stringify(pme));
  }

  public getPME() {
    return JSON.parse(sessionStorage.getItem(PME_KEY));
  }

  public authenticate(state) {
    window.sessionStorage.removeItem(IS_AUTHENTICATED);
    window.sessionStorage.setItem(IS_AUTHENTICATED, JSON.stringify(state));
  }

  public getAuthenticate():string {
    return window.sessionStorage.getItem(IS_AUTHENTICATED)
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
