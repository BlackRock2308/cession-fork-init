import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { Product } from 'src/app/workstation/model/product';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { Document, Documents } from 'src/app/workstation/model/document';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../visualiser-document/visualiser-document.component';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
@Component({
    selector: 'app-consulter-demande',
    templateUrl: './consulter-demande.component.html',
    styleUrls: ['./consulter-demande.component.scss'],
    providers: [DialogService]

})
export class ConsulterDemandeComponent implements OnInit {

    demandeCession: any;

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    demande: DemandeAdhesion;
    products: Product[];
    documents: Document[];

    document: Document;
    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    items: MenuItem[];
    home: MenuItem;
    profile:string;
    observationLibelle:string;

    constructor(private demandeCessionService: DemandesCessionService,
        public dialogService: DialogService,
         private messageService: MessageService, 
         private breadcrumbService: BreadcrumbService,
         private observationService:ObservationService) { 
            this.profile = localStorage.getItem('profil');

            if (this.profile === 'DRC') {
                this.breadcrumbService.setItems([
                    { label: 'Analyse du risque', routerLink: 'cdmp/analyse_risque' },
                    { label: 'Visualisation de la demande' }])
              }
              else if (this.profile === 'DSEAR') {
                this.breadcrumbService.setItems([
                  { label: 'Liste des demandes de cession', routerLink: 'cdmp/recevabilite' },
                  { label: 'Visualisation de la demande' }
                ]);
              }
        this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] })}

    ngOnInit() {        

        this.cols = [
            { field: 'ninea', header: 'NINEA' },
            { field: 'rccm', header: 'RCCM' },
            { field: 'datesoumission', header: 'Date Soumission' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.demandeCessionService.getDemandeObs().subscribe(data => {
            this.demandeCession = data
            this. documents=[]
                if(this.demandeCession.documents.length > 0){
                this.documents=this.documents.concat(this.demandeCession.documents)
               }
               if(this.demandeCession.pme.documents.length > 0){
               this.documents=this.documents.concat(this.demandeCession.pme.documents)
               }
               if(this.demandeCession.bonEngagement.documents.length > 0){
                this.documents=this.documents.concat(this.demandeCession.bonEngagement.documents)
               }
            console.log(this.demandeCession)
            this.observationService.getObservationByDemandeCessionANDStatut(this.demandeCession.idDemande,this.demandeCession.statut.libelle).subscribe(
                data => {
                    this.observationLibelle=data.libelle
                    console.log(this.observationLibelle)
                }
            )
          })

          //this.observationService.getByDemandeAndStatut(this.demandeCession.idDemande,StatutEnum.)

     

    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    visualiserDocument(document: Documents) {
        let nom = document.nomDocument;
        const ref = this.dialogService.open(VisualiserDocumentComponent, {
          data: {
            document: document
          },
          header: nom,
          width: '70%',
          height: 'calc(100% - 100px)',
          baseZIndex: 10000
        });
    
      }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    nineaValide(): any {
        const targetDiv = document.getElementById("actif");
        const btn = document.getElementById("oui");
        targetDiv.style.display = "flex";

    }

}
