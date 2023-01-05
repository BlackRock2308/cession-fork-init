import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BreadcrumbService } from "src/app/core/breadcrumb/breadcrumb.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FormeJuridiqueService } from "src/app/workstation/service/formeJuridique/formeJuridiqueService.service";
import Swal from "sweetalert2";
import { FormeJuridique } from "src/app/workstation/model/formeJuridique";
import { AddFormeJuridiqueComponent } from "../add-formeJuridique/add-formeJuridique.component";
import { UpdateFormeJuridiqueComponent } from "../update-formeJuridique/update-formeJuridique.component";
registerLocaleData(localeFr, 'fr')
@Component({
  selector: "app-list-formeJuridiques",
  templateUrl: "./list-formeJuridiques.component.html",
  styleUrls: ["./list-formeJuridiques.component.scss"],
  providers: [DialogService],
})
export class ListFormeJuridiqueComponent implements OnInit {
  paiementDialog: boolean;

  formeJuridiques : FormeJuridique[]=[];

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
    private formeJuridiqueService: FormeJuridiqueService,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([{ label: "Formes juridiques" }]);
    this.breadcrumbService.setHome({
      icon: "pi pi-home",
      routerLink: ["admin/forme_juridique"],
    });
  }

  ngOnInit(): void {
   this.getAllFormeJuridique();
    this.cols = [
      { field: "code", header: "Code" },
      { field: "libelle", header: "Libellé" }
    ];
  }


  getAllFormeJuridique() {
    this.formeJuridiqueService.getAllFormeJuridique()
    .subscribe((res:FormeJuridique[]) =>{
      this.formeJuridiques = res.reverse();
    })
  }


  ajouterFormeJuridique() {
    const ref = this.dialogService.open(AddFormeJuridiqueComponent, {
      header: "Nouvelle forme juridique",
      width: "50%",
      baseZIndex: 10000,
    });
  }
  supprimerFormeJuridique(formeJuridique) {
    Swal.fire({
      title: 'Voulez-vous supprimer la forme juridique'+formeJuridique.libelle+'?',
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
      this.formeJuridiqueService
        .deleteFormeJuridique(formeJuridique.id)
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

  modifierFormeJuridique(formeJuridique) {
    const ref = this.dialogService.open(UpdateFormeJuridiqueComponent, {
      data: {
        formeJuridique: formeJuridique,
      },
      header: "Motifier forme juridique",
      width: "50%",
      baseZIndex: 10000,
    });
  }

 
}
