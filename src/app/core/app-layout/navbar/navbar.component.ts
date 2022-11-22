import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PrimeNGConfig } from 'primeng/api';
import { AppMainComponent } from '../main/app.main.component';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfilComponent } from '../../../workstation/components/profil/profil.component';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
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

  configActive: boolean;
  profil: string;
  nom : string;
  prenom : string;

  constructor(public renderer: Renderer2, public dialogService: DialogService,
    public appMain: AppMainComponent, public router: Router,
    private tokenStorage:TokenStorageService) { }
  ngOnInit() {
    this.profil = localStorage.getItem('profil')
    this.nom = this.tokenStorage.getUser().nom
    this.prenom = this.tokenStorage.getUser().prenom

  }

  loggout() {
    this.tokenStorage.signOut()
    this.router.navigate(['/login']);
    localStorage.removeItem('auth-user');
    localStorage.removeItem('is-auth');
    localStorage.removeItem('pme-user');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('storedDemande');
    localStorage.removeItem('storedDemandeCession');
    localStorage.removeItem('profil');
  }

  visualiserProfil() {
    this.router.navigate(['workstation/profil']);
  }

}
