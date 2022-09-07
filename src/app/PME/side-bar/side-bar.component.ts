import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit,Renderer2 } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from 'src/app/core/app-layout/side-menu/app.menu.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
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
]
})
export class SideBarComponent implements OnInit {
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


  constructor(public renderer: Renderer2, private menuService: MenuService,
    private primengConfig: PrimeNGConfig, public app: AppComponent) { }

  
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

onMenuClick() {
  this.menuClick = true;
}


isHorizontal() {
  return this.app.horizontalMenu === true;
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

isDesktop() {
    return window.innerWidth > 991;
}

isMobile() {
    return window.innerWidth <= 991;
}



  ngOnInit(): void {
  }
 

}
