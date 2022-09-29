import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss']
})
export class AppLoginComponent {
  
  valCheck: string[] = ['remember'];

  password!: string;

  username: string;
  motdepasse: string;

  dark: boolean;

  checked: boolean;
  constructor(public router: Router){}

  login(username, motdepasse){
    if(username === 'cdmp'){
      this.router.navigate(['workstation/cdmp/dashboard']);
      localStorage.setItem('profil', 'cdmp'); 
    }
    if(username === 'pme'){
      this.router.navigate(['workstation/pme/demandes_en_cours']);
      localStorage.setItem('profil', 'pme'); 
    }
    if(username === 'comptable'){
      this.router.navigate(['workstation/cdmp/dashboard']);
      localStorage.setItem('profil', 'comptable'); 
    }
    if(username === 'DG'){
      this.router.navigate(['workstation/cdmp/dashboard']);
      localStorage.setItem('profil', 'DG'); 
    }
    if(username === 'ordonnateur'){
      this.router.navigate(['workstation/ordonnateur/conventions']);
      localStorage.setItem('profil', 'ordonnateur'); 
    }
   }

  loggout(){
    localStorage.removeItem('Profile');
  }

}
