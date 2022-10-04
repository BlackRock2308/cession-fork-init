import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/workstation/model/product';
import { Document, Documents } from 'src/app/workstation/model/document';
import { MenuItem, MessageService } from 'primeng/api';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { PME } from 'src/app/workstation/model/pme';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../visualiser-document/visualiser-document.component';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
    selector: 'app-tache-analyse',
    templateUrl: './tache-analyse.component.html',
    styleUrls: ['./tache-analyse.component.scss'],
    providers: [DialogService]
})
export class TacheAnalyseComponent implements OnInit {

    demandeCession: any;

    editNinea: PME;

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    demande: DemandeAdhesion;
    products: Product[];
    documents: Documents[];

    document: Document;
    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    routeItems: MenuItem[];

    items: MenuItem[];
    home: MenuItem;

    constructor(      private router: Router,
        private demandeCessionService: DemandesCessionService,
        private demandesAdhesionService: DemandesAdhesionService,public dialogService: DialogService, private documentService: DocumentService, private messageService: MessageService, private demandeAdhesionService: DemandesAdhesionService) { }

    ngOnInit() {
        this.demandeCessionService.getDemandeObs().subscribe(data => {
            this.demandeCession = data
            console.log(this.demandeCession)
          })
      
        //this.productService.getProducts().then(data => this.products = data);
        this.documentService.getDeocuments().subscribe(data => {
            this.documents = data
        });

        this.cols = [
            { field: 'ninea', header: 'NINEA' },
            { field: 'rccm', header: 'RCCM' },
            { field: 'datesoumission', header: 'Date Soumission' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.items = [
            { label: 'Liste de demandes à analyser', url: '/#/workstation/cdmp/analyse_risque' },
            { label: 'Analyse du risque' }
        ];

        this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
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

    visualiserDocument(document: Documents) {
        let nom = document.nomDocument;
        console.log('nom: ' + document.nomDocument + 'path ' +document.path )
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

 
    onSubmit() {
       
      
    
        Swal.fire({
          html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été completée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
          color:"#203359",
          confirmButtonColor:"#99CC33",
          confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
          allowOutsideClick:false,
          
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['workstation/cdmp/analyse_risque'])
          }})
    
          
    }

    onSubmitRejet() {
       
      
    
        Swal.fire({
          html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a  été rejetée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
          color:"#203359",
          confirmButtonColor:"#99CC33",
          confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
          allowOutsideClick:false,
          
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['workstation/cdmp/analyse_risque'])
          }})
    
          
    }

    onSubmitComplements() {
       
      
    
        Swal.fire({
          html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>Un complement des dossiers soumis sera demandé a la PME.</p> <br><p style='font-size: large;font-weight: bold;'></p>",
          color:"#203359",
          confirmButtonColor:"#99CC33",
          confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
          allowOutsideClick:false,
          
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['workstation/cdmp/analyse_risque'])
          }})
    
          
    }

}
