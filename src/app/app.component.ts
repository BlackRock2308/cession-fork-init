import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    horizontalMenu: boolean;
    policyId: number;
    
    darkMode = false;

    menuColorMode = 'light';

    menuColor = 'layout-menu-light';

    themeColor = 'blue';

    layoutColor = 'blue';

    ripple = true;

    inputStyle = 'outlined';
    pmes: any[] = [];
    isAuthenticated:boolean=false;


    constructor(private primengConfig: PrimeNGConfig,
        private tokenStorage:TokenStorageService,
        private router:Router) {}

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.isAuthenticated=!!this.tokenStorage.getAuthenticate();


        if(!this.isAuthenticated){
            this.router.navigate(['login'])
        }
    }
}
