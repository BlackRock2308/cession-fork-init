import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { VerificationComponent } from './adhesion-process/verification/verification.component';
import {DialogModule} from 'primeng/dialog';
import { PrimeNGConfig } from 'primeng/api';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { Product } from 'src/app/workstation/model/product';
import { ProductService } from 'src/app/workstation/service/product/product.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';


@Component({
  selector: 'app-demandes-adhesion',
  templateUrl: './demandes-adhesion.component.html',
  styleUrls: ['./demandes-adhesion.component.scss']
})
export class DemandesAdhesionComponent implements OnInit {



  productDialog: boolean;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[];
  demandes:DemandeAdhesion[];

  demande:DemandeAdhesion;
  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  routeItems: MenuItem[];


  constructor(private demandesAdhesionService: DemandesAdhesionService,private productService: ProductService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,private primengConfig:PrimeNGConfig) {
      this.breadcrumbService.setItems([
          { label: 'Pages' },
          { label: 'Crud', routerLink: ['/pages/crud'] }
      ]);
  }

  ngOnInit() {
      this.productService.getProducts().then(data => this.products = data);
      this.demandesAdhesionService.getDemandesAdhesion().subscribe(data=>{
        this.demandes=data
    console.log(this.demandes)});

      this.primengConfig.ripple=true;
      
      this.cols = [
          {field: 'ninea', header: 'NINEA'},
          {field: 'rccm', header: 'RCCM'},
          {field: 'datesoumission', header: 'Date Soumission'},
          {field: 'rating', header: 'Reviews'},
          {field: 'inventoryStatus', header: 'Status'}
      ];

      this.statuses = [
          {label: 'INSTOCK', value: 'instock'},
          {label: 'LOWSTOCK', value: 'lowstock'},
          {label: 'OUTOFSTOCK', value: 'outofstock'}
      ];

      this.routeItems = [
        {label: 'Verification', routerLink:'verification'},
        {label: 'Informations Complémentaires', routerLink:'informations_complémentaire'},
    ];

      
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(demande: DemandeAdhesion) {
      this.demande = {...demande};
      this.productDialog = true;
      //this.productService.setProductObs(product);

      
  }

  deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = {...product};
  }

  confirmDeleteSelected(){
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      this.selectedProducts = null;
  }

  confirmDelete(){
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      this.product = {};
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
              this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          } else {
              this.product.id = this.createId();
              this.product.code = this.createId();
              this.product.image = 'product-placeholder.svg';
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              this.products.push(this.product);
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
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

  nineaValide():any{
    const targetDiv = document.getElementById("actif");
    const btn = document.getElementById("oui");
    targetDiv.style.display = "flex";
  
}
}