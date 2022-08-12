import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from '../main/app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {

    model: any[];
    logoCDMPpath: string;

    constructor(public appMain: AppMainComponent) {
    }

    ngOnInit() {
        this.logoCDMPpath = '../../../../assets/layout/images/logo-cdmp.svg';
        this.model = [
            // les routes /espace-cdmp, /espace-pme, /espace-ministere et /espace-autre à créer dans le module workstation
            {label: 'Espace CDMP', icon: '', routerLink: ['/espace-cdmp']},
            {label: 'Espace PME', icon: '', routerLink: ['/espace-pme']},
            {label: 'Espace Ministère', icon: '', routerLink: ['/espace-ministere']},
            {label: 'Autres', icon: '', routerLink: ['/espace-autre']},
           /* {
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
*/
        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
