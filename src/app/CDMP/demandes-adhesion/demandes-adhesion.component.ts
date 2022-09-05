import {Component, OnInit} from '@angular/core';
import {Product} from '../../workstation/model/product';
import {ProductService} from '../../workstation/service/product/product.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { BreadcrumbService } from '../../core/breadcrumb/breadcrumb.service';
import { MenuItem } from 'primeng/api';


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

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  routeItems: MenuItem[];

  constructor(private productService: ProductService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
          { label: 'Pages' },
          { label: 'Crud', routerLink: ['/pages/crud'] }
      ]);
  }

  ngOnInit() {
      this.productService.getProducts().then(data => this.products = data);

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
        {label: 'Personal', routerLink:'personal'},
        {label: 'Seat', routerLink:'seat'},
        {label: 'Payment', routerLink:'payment'},
        {label: 'Confirmation', routerLink:'confirmation'},
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

  editProduct(product: Product) {
      this.product = {...product};
      this.productDialog = true;
      
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

  nineaValide():any{const targetDiv = document.getElementById("actif");
  const btn = document.getElementById("oui");
      targetDiv.style.display = "flex";
  
}
}