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


    constructor(private demandeCessionService: DemandesCessionService,public dialogService: DialogService, private documentService: DocumentService, private messageService: MessageService, private demandeAdhesionService: DemandesAdhesionService) { }

    ngOnInit() {

        //this.productService.getProducts().then(data => this.products = data);
        this.documentService.getDocuments().subscribe(data => {
            this.documents = data
        });

        this.cols = [
            { field: 'ninea', header: 'NINEA' },
            { field: 'rccm', header: 'RCCM' },
            { field: 'datesoumission', header: 'Date Soumission' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.demandeCessionService.getDemandeObs().subscribe(data => {
            this.demandeCession = data
            console.log(this.demandeCession)
          })
        this.items = [
            { label: 'Analyse du risque', url: '/#/workstation/cdmp/analyse_risque' },
            { label: 'Visualisation de la demande' }
          ];
      
          this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };
      

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

}
