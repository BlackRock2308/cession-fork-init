import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BreadcrumbService } from "src/app/core/breadcrumb/breadcrumb.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import Swal from "sweetalert2";
import { AddCentreDesServicesFiscauxComponent } from "../add-centreDesServicesFiscaux/add-centreDesServicesFiscaux.component";
import { CentreDesServicesFiscaux } from "src/app/workstation/model/centreDesServicesFiscaux";
import { CentreDesServicesFiscauxService } from "src/app/workstation/service/centreDesServicesFiscaux/centreDesServicesFiscauxService.service";
import { UpdateCentreDesServicesFiscauxComponent } from "../update-centreDesServicesFiscaux/update-centreDesServicesFiscaux.component";
registerLocaleData(localeFr, 'fr')
@Component({
  selector: "app-list-centreDesServicesFiscaux",
  templateUrl: "./list-centreDesServicesFiscaux.component.html",
  styleUrls: ["./list-centreDesServicesFiscaux.component.scss"],
  providers: [DialogService],
})
export class ListCentreDesServicesFiscauxComponent implements OnInit {
  paiementDialog: boolean;

  centreDesServicesFiscaux : CentreDesServicesFiscaux[]=[];

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
    private centreDesServicesFiscauxService: CentreDesServicesFiscauxService,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([{ label: "Centres des services fiscaux" }]);
    this.breadcrumbService.setHome({
      icon: "pi pi-home",
      routerLink: ["admin/centre_des_servicesFiscaux"],
    });
  }

  ngOnInit(): void {
   this.getAllCentreDesServicesFiscaux();
    this.cols = [
      { field: "code", header: "Code" },
      { field: "libelle", header: "Libellé" }
    ];
  }


  getAllCentreDesServicesFiscaux() {
    this.centreDesServicesFiscauxService.getAllCentreDesServicesFiscaux()
    .subscribe((res:CentreDesServicesFiscaux[]) =>{
      this.centreDesServicesFiscaux = res.reverse();
    })
  }


  ajouterCentreDesServicesFiscaux() {
    const ref = this.dialogService.open(AddCentreDesServicesFiscauxComponent, {
      header: "Nouveau centre des services fiscaux",
      width: "50%",
      baseZIndex: 10000,
    });
  }
  supprimerCentreDesServicesFiscaux(centreDesServicesFiscaux) {
    Swal.fire({
      title: 'Voulez-vous supprimer le centre des services fiscaux '+centreDesServicesFiscaux.libelle+'?',
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
      this.centreDesServicesFiscauxService
        .deleteCentreDesServicesFiscaux(centreDesServicesFiscaux.id)
        .subscribe((res: any) => {        
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'centre supprimé avec succès.',
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

  modifierCentreDesServicesFiscaux(centreDesServicesFiscaux) {
    const ref = this.dialogService.open(UpdateCentreDesServicesFiscauxComponent, {
      data: {
        centreDesServicesFiscaux: centreDesServicesFiscaux,
      },
      header: "Motifier centre des services fiscaux",
      width: "50%",
      baseZIndex: 10000,
    });
  }

 
}
