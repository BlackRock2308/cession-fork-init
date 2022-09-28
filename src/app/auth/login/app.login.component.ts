import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss']
})
export class AppLoginComponent {

  username: string;
  motdepasse: string;

  dark: boolean;

  checked: boolean;
  constructor(public router: Router){}

  login(username, motdepasse){
    if(username === 'cdmp'){
      this.router.navigate(['workstation']);
      localStorage.setItem('profil', 'cdmp'); 
    }
    if(username === 'pme'){
      this.router.navigate(['workstation']);
      localStorage.setItem('profil', 'pme'); 
    }
    if(username === 'comptable'){
      this.router.navigate(['workstation']);
      localStorage.setItem('profil', 'comptable'); 
    }
    if(username === 'DG'){
      this.router.navigate(['workstation']);
      localStorage.setItem('profil', 'DG'); 
    }
    if(username === 'ordonnateur'){
      this.router.navigate(['workstation']);
      localStorage.setItem('profil', 'ordonnateur'); 
    }
   }

  loggout(){
    localStorage.removeItem('Profile');
  }

}
