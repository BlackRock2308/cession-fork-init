import {Component} from '@angular/core';
import {AppMainComponent} from '../main/app.main.component';

@Component({
    selector: 'app-topbar',
    templateUrl: 'app.topbar.component.html',
    styleUrls: ['app.topbar.component.scss']
})
export class AppTopBarComponent {

    activeItem: number;

    constructor(public appMain: AppMainComponent) {}

    mobileMegaMenuItemClick(index) {
        this.appMain.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }

}
