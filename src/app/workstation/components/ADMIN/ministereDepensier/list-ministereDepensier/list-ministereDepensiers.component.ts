import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BreadcrumbService } from "src/app/core/breadcrumb/breadcrumb.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MinistereDepensier } from "src/app/workstation/model/MinistereDepensier";
import { MinistereDepensierService } from "src/app/workstation/service/ministereDepensier/ministereDepensierService.service";
import { AddMinistereDepensierComponent } from "../add-ministereDepensier/add-ministereDepensiers.component";
import Swal from "sweetalert2";
registerLocaleData(localeFr, 'fr')
@Component({
  selector: "app-list-ministereDepensiers",
  templateUrl: "./list-ministereDepensiers.component.html",
  styleUrls: ["./list-ministereDepensiers.component.scss"],
  providers: [DialogService],
})
export class ListMinistereDepensierComponent implements OnInit {
  paiementDialog: boolean;

  ministereDepensiers : MinistereDepensier[]=[];

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];

  activeIndex: number = 1;
  documents: any[];
  idPaiement: number;
  angle = 0;
  zoom = 0.8;
  textLayerRenderedCb = 0;
  value1: any;
  totalPages: number;
  afterpageLoadedCb = 0;
  pageVariable = 1;
  ref: DynamicDialogRef;
  home: MenuItem;
  constructor(
    private ministereDepensierService: MinistereDepensierService,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute, private router:Router,
  ) {
    this.route.params.subscribe(
      (params: Params) => (this.idPaiement = params["idPaiement"])
    );
    this.breadcrumbService.setItems([
      { label: "Paiements", routerLink: ["comptable/paiements"] },
      { label: "Paiement CDMP" },
    ]);
    this.breadcrumbService.setHome({
      icon: "pi pi-home",
      routerLink: ["cdmp/dashboard"],
    });
  }

  ngOnInit(): void {
   this.getAllMinistereDepensier();
    this.cols = [
      { field: "code", header: "Code" },
      { field: "libelle", header: "Libellé" }
    ];
  }


  getAllMinistereDepensier() {
    this.ministereDepensierService.getAllMinistereDepensier()
    .subscribe((res:MinistereDepensier[]) =>{
      this.ministereDepensiers = res;
    })
  }


  ajouterMinistereDepensier(ministereDepensier) {
    const ref = this.dialogService.open(AddMinistereDepensierComponent, {
      data: {
        ministereDepensier: ministereDepensier,
      },
      header: "Nouveau ministère",
      width: "50%",
      baseZIndex: 10000,
    });
  }
  supprimerMinistereDepensier(ministereDepensier) {
    Swal.fire({
      title: 'Voulez-vous supprimer ce ministère?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
      confirmButtonColor:'#99CC33FF',
        denyButtonColor:'#981639FF',
        cancelButtonColor:'#333366FF',
        customClass: {
          actions: 'my-actions',
          denyButton: 'order-1 right-gap',
          confirmButton: 'order-2',
        }
    }).then((result) => {
      if (result.isConfirmed) {
      this.ministereDepensierService
        .deleteMinistereDepensier(ministereDepensier.id)
        .subscribe((res: any) => {        
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ministère supprimé avec succès.',
            showConfirmButton: false,
            timer: 1500
          })          
          location.reload();
        }),
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur de suppression!',
          })
        }
  }})
}

  modifierMinistereDepensier(ministereDepensier) {
    const ref = this.dialogService.open(AddMinistereDepensierComponent, {
      data: {
        ministereDepensier: ministereDepensier,
      },
      header: "Motifier ministère",
      width: "50%",
      baseZIndex: 10000,
    });
  }

 
}
