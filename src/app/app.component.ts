import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import { PmeService } from './pme.service';
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

    constructor(private primengConfig: PrimeNGConfig, private pmeService: PmeService) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.pmeService.getPmes().subscribe((data : any[])=>{
            console.log(data);
            this.pmes = data;
        })
    }

    public deletePme(pmeId){
        this.pmeService.deletePme(pmeId).subscribe((ret)=>{
              console.log("Pme deleted: ", ret);
        })
    }
    
    public updatePolicy(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
        let newPme:{id: number, amount: number, clientId: number, userId: number, description: string} ;
        this.pmeService.updatePme(newPme).subscribe((ret)=>{
              console.log("Policy updated: ", ret);
        });
   } 

    public createPme(pme){
        this.pmeService.createPme(pme).subscribe((ret)=>{
              console.log("Pme created: ", ret);
        });
    }
}
