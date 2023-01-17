import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem, PrimeNGConfig, SelectItem } from 'primeng/api';
import { AppMainComponent } from '../main/app.main.component';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfilComponent } from '../../../workstation/components/profil/profil.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { WebsocketService } from 'src/app/workstation/service/websocket/websocket.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('mask-anim', [
      state('void', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 0.8
      })),
      transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
    ])
  ],
  providers: [ DialogService]
})
export class NavbarComponent implements OnInit {

  demandes: any[];

  demande: any;

  rightPanelClick: boolean;

  rightPanelActive: boolean;

  menuClick: boolean;

  staticMenuActive: boolean;

  menuMobileActive: boolean;

  megaMenuClick: boolean;

  megaMenuActive: boolean;

  megaMenuMobileClick: boolean;

  megaMenuMobileActive: boolean;

  topbarItemClick: boolean;

  topbarMobileMenuClick: boolean;

  topbarMobileMenuActive: boolean;

  sidebarActive: boolean;

  activeTopbarItem: any;

  topbarMenuActive: boolean;

  menuHoverActive: boolean;
  home: MenuItem;
  subscribe: any;
  rangeDates: any[];
  matchModeOptions: SelectItem[];
  page: any={};
  statuts:any[];
  paramStatuts:any[];
  paramStatutsInit:any[];
  defaultRows:number;
  configActive: boolean;
  profil: string;
  nom : string;
  prenom : string;
  roles:string;

  userEmail : string;
  userPassword : string;

  constructor(public renderer: Renderer2, public dialogService: DialogService,
    public appMain: AppMainComponent, public router: Router,
    private demandeCessionService: DemandesCessionService,
    private tokenStorage:TokenStorageService,
    private socket : WebsocketService) { }
    
  ngOnInit() {
    this.paramStatuts = this.paramStatutsInit
    this.profil = localStorage.getItem('profil')
    this.nom = this.tokenStorage.getUser().nom
    this.prenom = this.tokenStorage.getUser().prenom
    this.roles=this.tokenStorage.getUser().roles[0].description;

    console.log(sessionStorage.getItem("auth-user"))

    var storedArray = sessionStorage.getItem("auth-user");

    var retrievedArray = JSON.parse(storedArray);

    // Get the first element of the array
    this.userEmail = retrievedArray.email;

    this.userPassword = retrievedArray.password;


    console.log("Email of the User : " + this.userEmail);
    console.log("Password of the User : " + this.userPassword);



  }

  disconnect(){
    this.socket._disconnect(this.userEmail);
  }

  loggout() {
    this.tokenStorage.signOut();
    this.disconnect();
    this.router.navigate(['/login']);
    localStorage.removeItem('auth-user');
    localStorage.removeItem('is-auth');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('storedDemande');
    localStorage.removeItem('profil');

  }

  visualiserProfil() {
    this.router.navigate(['workstation/profil']);
  }
  modifierInfosPME(demande: DemandeCession) {
    this.demande = { ...demande };
    this.demandeCessionService.setDemandeObs(demande);
    this.router.navigate(['workstation/pme/infosPME']);
  }

}
