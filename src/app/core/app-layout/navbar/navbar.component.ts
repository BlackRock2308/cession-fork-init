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

  constructor(public renderer: Renderer2, public dialogService: DialogService,
    public appMain: AppMainComponent, public router: Router,
    private demandeCessionService: DemandesCessionService,

    private tokenStorage:TokenStorageService) { }
  ngOnInit() {
    this.paramStatuts = this.paramStatutsInit
    this.profil = localStorage.getItem('profil')
    this.nom = this.tokenStorage.getUser().nom
    this.prenom = this.tokenStorage.getUser().prenom
    this.roles=this.tokenStorage.getUser().roles[0].description;
    console.log('affichhh' + JSON.stringify(this.tokenStorage.getUser()))

  }

  loggout() {
    this.tokenStorage.signOut()
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
    console.log(demande)
    this.demandeCessionService.setDemandeObs(demande);
    this.router.navigate(['workstation/pme/infosPME']);
  }

}
