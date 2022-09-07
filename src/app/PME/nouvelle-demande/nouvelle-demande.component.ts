import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PME } from 'src/app/workstation/model/pme';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';
import {Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from 'src/app/core/app-layout/side-menu/app.menu.service';

@Component({
  selector: 'app-nouvelle-demande',
  templateUrl: './nouvelle-demande.component.html',
  styleUrls: ['./nouvelle-demande.component.scss'],
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
})
export class NouvelleDemandeComponent implements OnInit {
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


  selectedNINEAFiles: File | null = null;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  form!: FormGroup;
  submitted = false;
  pme: PME;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adhesionService: AdhesionService,
    public renderer: Renderer2, private menuService: MenuService,
    private primengConfig: PrimeNGConfig,
    public app: AppComponent
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      ninea: ['', Validators.required],
      rccm: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nineaFile: ['', Validators.required],
      rccmFile: ['', [Validators.required]],
  });
  }

  //sélectionner le fichier du ninea
  selectNINEAFile(files: any): void {
    this.selectedNINEAFiles = files.target.files[0];
    console.log(this.selectedNINEAFiles);
  }


  
  onLayoutClick() {
    if (!this.topbarItemClick) {
        this.activeTopbarItem = null;
        this.topbarMenuActive = false;
    }

    if (!this.rightPanelClick) {
        this.rightPanelActive = false;
    }

    if (!this.megaMenuClick) {
        this.megaMenuActive = false;
    }

    if (!this.megaMenuMobileClick) {
        this.megaMenuMobileActive = false;
    }

    if (!this.menuClick) {
        if (this.isHorizontal()) {
            this.menuService.reset();
        }

        if (this.menuMobileActive) {
            this.menuMobileActive = false;
        }

        this.menuHoverActive = false;
    }

    this.menuClick = false;
    this.topbarItemClick = false;
    this.megaMenuClick = false;
    this.megaMenuMobileClick = false;
    this.rightPanelClick = false;
}

onMegaMenuButtonClick(event) {
    this.megaMenuClick = true;
    this.megaMenuActive = !this.megaMenuActive;
    event.preventDefault();
}

onMegaMenuClick(event) {
    this.megaMenuClick = true;
    event.preventDefault();
}

onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
        this.activeTopbarItem = null; } else {
        this.activeTopbarItem = item; }

    event.preventDefault();
}

onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.rightPanelActive = !this.rightPanelActive;

    event.preventDefault();
}

onRightPanelClose(event) {
    this.rightPanelActive = false;
    this.rightPanelClick = false;

    event.preventDefault();
}

onRightPanelClick(event) {
    this.rightPanelClick = true;

    event.preventDefault();
}

onTopbarMobileMenuButtonClick(event) {
    this.topbarMobileMenuClick = true;
    this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

    event.preventDefault();
}

onMegaMenuMobileButtonClick(event) {
    this.megaMenuMobileClick = true;
    this.megaMenuMobileActive = !this.megaMenuMobileActive;

    event.preventDefault();
}

onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isMobile()) {
        this.menuMobileActive = !this.menuMobileActive;
    }

    event.preventDefault();
}

onSidebarClick(event: Event) {
    this.menuClick = true;
}

onToggleMenuClick(event: Event) {
    this.staticMenuActive = !this.staticMenuActive;
    event.preventDefault();
}

onRippleChange(event) {
    this.app.ripple = event.checked;
    this.primengConfig = event.checked;
}

isDesktop() {
    return window.innerWidth > 991;
}

isMobile() {
    return window.innerWidth <= 991;
}

isHorizontal() {
    return this.app.horizontalMenu === true;
}

//ouvrir la boite de dialogue du répertoire
  handleNINEAClick() {
    document.getElementById('upload-NINEAfile').click();
  }



  //ouvrir la boite de dialogue du répertoire
  handleRCCMClick() {
    document.getElementById('upload-RCCMfile').click();
  }


  //envoie du formulaire
  onSubmit() {
    // arrêter si le formulaire est invalide
    if (this.form.invalid) {
        return;
    }
  
    this.enregistrerBon();
    
}


//enregistrement du bbn d'engagement avec l'appel du service d'enregistrement
private enregistrerBon() {
  this.pme=this.form.value;
  this.pme.nineaFile=this.selectedNINEAFiles;
  //fonction à continuer 
  console.log(this.pme);
  /*this.adhesionService.postPME(this.pme)
      .subscribe(() => {
         })*/
      
}


}