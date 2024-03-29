import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyWebSocketServiceService } from 'src/app/workstation/service/my-web-socket-service.service';
import { WebsocketService } from 'src/app/workstation/service/websocket/websocket.service';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
// import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.scss']
})
export class AppLoginComponent implements OnInit {

  valCheck: string[] = ['remember'];

  password: string;

  username: string;

  dark: boolean;

  credentials: {};

  checked: boolean;
  roles: any = [];

  notAuthorized: boolean;
  changePassword: boolean;
  changeCodePin: boolean;
  constructor(public router: Router, 
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private socket : WebsocketService,
    ) { }
  ngOnInit(): void {

    //this.login('sene@gmail.com','passer');
  }


  // this.webSocketService.connect();
  // this.webSocketService.subscribe().subscribe(message => {
  //   console.log(message);
  // });

  connect(){
    this.socket._connect(this.username, this.password);

    console.log("Test me");

    // this.webSocketService.connect(this.username, this.password);
    // this.webSocketService.subscribe().subscribe(message => {
    // });

  }
  
  // disconnect(){
  //   this.socket._disconnect(this.username);
  // }

  sendMessage(){
    this.socket._send(this.username);
  }


  login(username, motdepasse) {

    this.credentials = { username, motdepasse },

      this.tokenStorage.signOut();

      this.connect();



    this.authService.login(JSON.stringify({ email: username, password: motdepasse })).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.utilisateur);
        this.tokenStorage.authenticate(true);

        this.roles = this.tokenStorage.getUser().roles;
        this.changePassword = this.tokenStorage.getUser().updatePassword;
        this.changeCodePin = this.tokenStorage.getUser().updateCodePin;

        
        //this.sendMessage();

        if (this.changePassword) {
          this.router.navigate(['login/maj_pwd']);
        }
        else {
          if (this.roles.find(elem => elem.libelle == 'DRC') != null) {
            localStorage.setItem('profil', 'DRC');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/cdmp/dashboard']);
            }

          }
          if (this.roles.find(elem => elem.libelle == 'DSEAR') != null) {
            localStorage.setItem('profil', 'DSEAR');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/cdmp/dashboard']);
            }
          }
          if (this.roles.find(elem => elem.libelle == 'JURISTE') != null) {
            localStorage.setItem('profil', 'JURISTE');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/comptable/convention_cession']);
            }
          }
          if (this.roles.find(elem => elem.libelle == 'PME') != null) {
            this.authService.getPmebyUser(this.tokenStorage.getUser().idUtilisateur).subscribe(
              data =>{
                if(data){
                  this.tokenStorage.savePME(data)

                  localStorage.setItem('profil', 'PME'); 
                  if(this.changeCodePin){
                    this.router.navigate(['workstation/profil']);
                    
        
                  }
                  else{
                    this.router.navigate(['workstation/pme/demandes_en_cours']);
                    
                  }
                }
                
              } 
            )
            
            
          }
          if (this.roles.find(elem => elem.libelle == 'DAF') != null) {
            localStorage.setItem('profil', 'DAF');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/cdmp/dashboard']);
            }
          }
          if (this.roles.find(elem => elem.libelle == 'DG') != null) {
            localStorage.setItem('profil', 'DG');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/cdmp/dashboard']);
            }
          }
          if (this.roles.find(elem => elem.libelle == 'PCA') != null) {
            localStorage.setItem('profil', 'PCA');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/cdmp/dashboard']);
            }
          }
          if (this.roles.find(elem => elem.libelle == 'ORDONNATEUR') != null) {
            localStorage.setItem('profil', 'ORDONNATEUR');
            localStorage.setItem('CODE_MINISTERE', 'ORDONNATEUR');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/ordonnateur/conventions']);
            }
          }
          if (this.roles.find(elem => elem.libelle == 'ADMIN') != null) {
            localStorage.setItem('profil', 'ADMIN');
            if (this.changeCodePin) {
              this.router.navigate(['workstation/profil']);

            }
            else {
              this.router.navigate(['workstation/admin/ministere_depensier']);
            }
          }
        }


      },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.notAuthorized = true
        }
      }
    )
    //window.location.reload();



  }

  loggout() {
    localStorage.removeItem('Profile');
  }

}
