import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
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
    
   }

  loggout(){
    localStorage.removeItem('Profile');
  }

}
