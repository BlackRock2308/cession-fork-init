import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {

    subscription1: Subscription;
    subscription2: Subscription;
    nom: string;
    prenom: string;

    items: MenuItem[];
    home:MenuItem;

    constructor(public breadcrumbService: BreadcrumbService, private tokenStorage:TokenStorageService) {
        this.subscription1 = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
           // this.home=response;
        });
        this.subscription2=breadcrumbService.itemsHandler2.subscribe(response => {
            //this.items = response;
            this.home=response;
        });
    }

    OnInit(){
    this.nom = this.tokenStorage.getUser().nom
    this.prenom = this.tokenStorage.getUser().prenom
    }
    ngOnDestroy() {
        if (this.subscription1) {
            this.subscription1.unsubscribe();
        }
        if(this.subscription2){
            this.subscription2.unsubscribe();

        }
    }
}
