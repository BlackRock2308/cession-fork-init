import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandesAdhesionComponent } from '../demandes-adhesion/demandes-adhesion.component';
import { DetailsTableauComponent } from './details-tableau/details-tableau.component';

@Component({
  selector: 'app-dashboard-dg',
  templateUrl: './dashboard-dg.component.html',
  styleUrls: ['./dashboard-dg.component.scss'],
  providers: [DialogService]

})
export class DashboardDGComponent implements OnInit {

  demandeDialog: boolean;



  demandes:DemandeAdhesion[];

  demande:DemandeAdhesion;


  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];
   
  activeIndex: number = 1;

  constructor(private demandesAdhesionService: DemandesAdhesionService,public dialogService: DialogService,private messageService:MessageService, private router: Router,) { }

  ngOnInit() {

    this.demandesAdhesionService.getDemandesAdhesion().subscribe(data=>{
      this.demandes=data});
        
        this.cols = [
            {field: 'ninea', header: 'NINEA'},
            {field: 'rccm', header: 'RCCM'},
            {field: 'datesoumission', header: 'Date Soumission'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];
  
  
  }

  visualiserDetails(demande: DemandesAdhesionComponent) {
    const ref = this.dialogService.open(DetailsTableauComponent, {
      data: {
        demande: demande
      },
      header: "Details Tableau",
      width: '70%',
      height: 'calc(100% - 100px)',
      baseZIndex: 10000
    });

}
}