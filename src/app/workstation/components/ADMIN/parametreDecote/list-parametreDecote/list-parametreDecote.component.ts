import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BreadcrumbService } from "src/app/core/breadcrumb/breadcrumb.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import Swal from "sweetalert2";
import { AddParametrageDecoteComponent } from "../add-parametreDecote/add-parametreDecote.component";
import { UpdateParametrageDecoteComponent } from "../update-parametreDecote/update-parametreDecote.component";
import { ParametrageDecote } from "src/app/workstation/model/parametreDecote";
import { ParametrageDecoteServices } from "src/app/workstation/service/parametrageDecote/parametrageDecoteServices.service";
registerLocaleData(localeFr, 'fr')
@Component({
  selector: "app-list-parametreDecote",
  templateUrl: "./list-parametreDecote.component.html",
  styleUrls: ["./list-parametreDecote.component.scss"],
  providers: [DialogService],
})
export class ListParametrageDecoteComponent implements OnInit {
  paiementDialog: boolean;

  parametrageDecotes : ParametrageDecote[]=[];

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
    private parametrageDecoteService: ParametrageDecoteServices,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([{ label: "Paramètratage des décotes" }]);
    this.breadcrumbService.setHome({
      icon: "pi pi-home",
      routerLink: ["admin/parametrages_decotes"],
    });
  }

  ngOnInit(): void {
   this.getAllParametrageDecote();
    this.cols = [
      { field: "borneInf", header: "Borne inférieure" },
      { field: "borneSup", header: "Borne supérieure" },
      { field: "decoteValue", header: "Valeur décote" }
    ];
  }


  getAllParametrageDecote() {
    this.parametrageDecoteService.getAllParametrageDecote()
    .subscribe((res:ParametrageDecote[]) =>{
      this.parametrageDecotes = res.reverse();
    })
  }


  ajouterDecote() {
    const ref = this.dialogService.open(AddParametrageDecoteComponent, {
      header: "Nouvelle décote",
      width: "50%",
      baseZIndex: 10000,
    });
  }
  supprimerDecote(parametrageDecote) {
    Swal.fire({
      title: 'Voulez-vous supprimer cette décote?',
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
      this.parametrageDecoteService
        .deleteParametrageDecote(parametrageDecote.idDecote)
        .subscribe((res: any) => {        
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Décote supprimée avec succès.',
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

modifierDecote(parametrageDecote) {
    const ref = this.dialogService.open(UpdateParametrageDecoteComponent, {
      data: {
        parametrageDecote: parametrageDecote,
      },
      header: "Motifier la décote",
      width: "50%",
      baseZIndex: 10000,
    });
  }

 
}
