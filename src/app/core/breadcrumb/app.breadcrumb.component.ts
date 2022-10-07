import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {

    subscription1: Subscription;
    subscription2: Subscription;

    items: MenuItem[];
    home:MenuItem;

    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription1 = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
           // this.home=response;
        });
        this.subscription2=breadcrumbService.itemsHandler2.subscribe(response => {
            //this.items = response;
            this.home=response;
        });
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
