import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../main/app.main.component';
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

    profil: string;


  constructor( public appMain: AppMainComponent ) { }

  

  onMenuClick() {
    this.appMain.menuClick = true;
}



  ngOnInit() {
    this.profil = localStorage.getItem('profil');
  }
 

}
