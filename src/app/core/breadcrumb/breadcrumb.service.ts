import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable()
export class BreadcrumbService {

    private itemsSource = new Subject<MenuItem[]>();
    private homeSource= new Subject<MenuItem>();

    itemsHandler = this.itemsSource.asObservable();
    itemsHandler2 = this.homeSource.asObservable();


    setItems(items: MenuItem[]) {
        this.itemsSource.next(items);
    };

    setHome(home: MenuItem){
this.homeSource.next(home);
    }
}
