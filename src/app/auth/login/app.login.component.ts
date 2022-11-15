import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss']
})
export class AppLoginComponent implements OnInit{
  
  valCheck: string[] = ['remember'];

  password: string;

  username: string;

  dark: boolean;

  credentials:{};

  checked: boolean;
  roles: any=[];

  notAuthorized:boolean;
  changePassword:boolean;
  changeCodePin: boolean;
  constructor(public router: Router,private authService:AuthService,private tokenStorage:TokenStorageService){}
  ngOnInit(): void {


    //this.login('sene@gmail.com','passer');
  }

  login(username, motdepasse){

    this.credentials={username,motdepasse},

    this.tokenStorage.signOut();

    console.log(JSON.stringify({email:username,password:motdepasse}))

    this.authService.login(JSON.stringify({email:username,password:motdepasse})).subscribe(
      (data) => {
        console.log(data)
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.utilisateur);
        this.tokenStorage.authenticate(true);

        this.roles=this.tokenStorage.getUser().roles;
        this.changePassword=this.tokenStorage.getUser().updatePassword;
        this.changeCodePin=this.tokenStorage.getUser().updateCodePin;


        
        if(this.changePassword){
          this.router.navigate(['login/maj_pwd']);
        }
        else{
          
          if(this.changeCodePin){
            this.router.navigate(['workstation/profil']);

          }
          else{
            if(this.roles.find(elem => elem.libelle == 'DRC')!=null){
              this.router.navigate(['workstation/cdmp/dashboard']);
              localStorage.setItem('profil', 'DRC'); 
            }
            if(this.roles.find(elem => elem.libelle == 'DSEAR')!=null){
              this.router.navigate(['workstation/cdmp/dashboard']);
              localStorage.setItem('profil', 'DSEAR'); 
            }
            if(this.roles.find(elem => elem.libelle == 'JURISTE')!=null){
              this.router.navigate(['workstation/comptable/convention_cession']);
              localStorage.setItem('profil', 'JURISTE'); 
            }
            if(this.roles.find(elem => elem.libelle == 'PME')!=null){
              this.authService.getPmebyUser(this.tokenStorage.getUser().idUtilisateur).subscribe(
                data =>{
                  this.tokenStorage.savePME(data)
                } 
              )
              
              this.router.navigate(['workstation/pme/demandes_en_cours']);
              localStorage.setItem('profil', 'PME'); 
            }
            if(this.roles.find(elem => elem.libelle == 'DAF')!=null){
              this.router.navigate(['workstation/cdmp/dashboard']);
              localStorage.setItem('profil', 'DAF'); 
            }
            if(this.roles.find(elem => elem.libelle == 'DG')!=null){
              this.router.navigate(['workstation/cdmp/dashboard']);
              localStorage.setItem('profil', 'DG'); 
            }
            if(this.roles.find(elem => elem.libelle == 'ORDONNATEUR')!=null){
              this.router.navigate(['workstation/ordonnateur/conventions']);
              localStorage.setItem('profil', 'ORDONNATEUR'); 
            }
          }
          
        }
        

      } ,  
      (error:HttpErrorResponse) => {
        if(error.status==401){
          this.notAuthorized=true
        }
      } 
      )
      //window.location.reload();


      
   }

  loggout(){
    localStorage.removeItem('Profile');
  }

}
