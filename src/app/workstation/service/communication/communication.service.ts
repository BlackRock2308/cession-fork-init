import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../../model/product';

@Injectable()
export class CommunicationService {

    private dialogObs: BehaviorSubject<any> = new BehaviorSubject(false);


    constructor(private http: HttpClient,
        
        ) { }

    getDialogObs(): boolean {
        return this.dialogObs.value;
    }

    setDialogObs(dialog: boolean) {
        this.dialogObs.next(dialog);
    }
}
