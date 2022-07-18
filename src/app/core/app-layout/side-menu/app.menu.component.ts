import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from '../main/app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) {
    }

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Menu 1', icon: 'pi pi-fw pi-file', routerLink: ['/path1']
            }, {
                label: 'Menu 2', icon: 'pi pi-fw pi-file', routerLink: ['/path1']
            }, {
                label: 'Menu 3', icon: 'pi pi-fw pi-file', routerLink: ['/path1']
            }

        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
