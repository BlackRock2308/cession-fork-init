import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from 'src/app/core/app-layout/side-menu/app.menu.service';
import { Product } from 'src/app/workstation/model/product';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-analyse-risque',
  templateUrl: './analyse-risque.component.html',
  styleUrls: ['./analyse-risque.component.scss'],
  animations:[
    trigger('mask-anim', [
      state('void', style({
          opacity: 0
      })),
      state('visible', style({
          opacity: 0.8
      })),
      transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
  ])
  ]
})
export class AnalyseRisqueComponent implements OnInit {


  
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

  activeItem : number;
  rightPanelClick: boolean;

    rightPanelActive: boolean;

    menuClick: boolean;

    staticMenuActive: boolean;

    menuMobileActive: boolean;

    megaMenuClick: boolean;

    megaMenuActive: boolean;

    megaMenuMobileClick: boolean;

    megaMenuMobileActive: boolean;

    topbarItemClick: boolean;

    topbarMobileMenuClick: boolean;

    topbarMobileMenuActive: boolean;

    sidebarActive: boolean;

    activeTopbarItem: any;

    topbarMenuActive: boolean;

    menuHoverActive: boolean;

    configActive: boolean;
    isAuthenticated: boolean;



  constructor(private demandesAdhesionService: DemandesAdhesionService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,private primengConfig:PrimeNGConfig,public renderer: Renderer2, private menuService: MenuService,
    public app: AppComponent) { 
     // this.productService.getProducts().then(data => this.products = data);
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

  ngOnInit() {

  }

  mobileMegaMenuItemClick(index) {
    this.megaMenuMobileClick = true;
    this.activeItem = this.activeItem === index ? null : index;
}
onMenuClick() {
  this.menuClick = true;
}
onLayoutClick() {
  if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
  }

  if (!this.rightPanelClick) {
      this.rightPanelActive = false;
  }

  if (!this.megaMenuClick) {
      this.megaMenuActive = false;
  }

  if (!this.megaMenuMobileClick) {
      this.megaMenuMobileActive = false;
  }

  if (!this.menuClick) {
      if (this.isHorizontal()) {
          this.menuService.reset();
      }

      if (this.menuMobileActive) {
          this.menuMobileActive = false;
      }

      this.menuHoverActive = false;
  }

  this.menuClick = false;
  this.topbarItemClick = false;
  this.megaMenuClick = false;
  this.megaMenuMobileClick = false;
  this.rightPanelClick = false;
}

onMegaMenuButtonClick(event) {
  this.megaMenuClick = true;
  this.megaMenuActive = !this.megaMenuActive;
  event.preventDefault();
}

onMegaMenuClick(event) {
  this.megaMenuClick = true;
  event.preventDefault();
}

onTopbarItemClick(event, item) {
  this.topbarItemClick = true;

  if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null; } else {
      this.activeTopbarItem = item; }

  event.preventDefault();
}

onRightPanelButtonClick(event) {
  this.rightPanelClick = true;
  this.rightPanelActive = !this.rightPanelActive;

  event.preventDefault();
}

onRightPanelClose(event) {
  this.rightPanelActive = false;
  this.rightPanelClick = false;

  event.preventDefault();
}

onRightPanelClick(event) {
  this.rightPanelClick = true;

  event.preventDefault();
}

onTopbarMobileMenuButtonClick(event) {
  this.topbarMobileMenuClick = true;
  this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

  event.preventDefault();
}

onMegaMenuMobileButtonClick(event) {
  this.megaMenuMobileClick = true;
  this.megaMenuMobileActive = !this.megaMenuMobileActive;

  event.preventDefault();
}

onMenuButtonClick(event) {
  this.menuClick = true;
  this.topbarMenuActive = false;

  if (this.isMobile()) {
      this.menuMobileActive = !this.menuMobileActive;
  }

  event.preventDefault();
}

onSidebarClick(event: Event) {
  this.menuClick = true;
}

onToggleMenuClick(event: Event) {
  this.staticMenuActive = !this.staticMenuActive;
  event.preventDefault();
}

onRippleChange(event) {
  this.app.ripple = event.checked;
  this.primengConfig = event.checked;
}

isDesktop() {
  return window.innerWidth > 991;
}

isMobile() {
  return window.innerWidth <= 991;
}

isHorizontal() {
  return this.app.horizontalMenu === true;
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
