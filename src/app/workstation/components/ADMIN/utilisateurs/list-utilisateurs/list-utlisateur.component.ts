import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BreadcrumbService } from "src/app/core/breadcrumb/breadcrumb.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import Swal from "sweetalert2";
import { Utilisateur } from "src/app/workstation/model/utilisateur";
import { UtilisateurService } from "src/app/workstation/service/utilisateur/utilisateur.service";
import { AddUtilisateurComponent } from "../add-utlisateurs/add-utlisateur.component";
import { UpdateUtilisateurComponent } from "../update-utilisateurs/update-utlisateur.component";
import { ViewUtilisateurComponent } from "../visualiser-utilisateurs/visualiser-utlisateur.component";
registerLocaleData(localeFr, 'fr')
@Component({
  selector: "app-list-utlisateur",
  templateUrl: "./list-utlisateur.component.html",
  styleUrls: ["./list-utlisateur.component.scss"],
  providers: [DialogService],
})
export class ListUtilisateurComponent implements OnInit {
  paiementDialog: boolean;

  utilisateurs : Utilisateur[]=[];

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
    private utilisateurService: UtilisateurService,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([{ label: "Gestions des utilisateurs" }]);
    this.breadcrumbService.setHome({
      icon: "pi pi-home",
      routerLink: ["admin/utilisateurs"],
    });
  }

  ngOnInit(): void {
   this.getAllUtilisateur();
    this.cols = [
      { field: "prenom_nom", header: "Prénom & Nom" },
      { field: "telephone", header: "Téléphone" },
      { field: "email", header: "email" },
      { field: "profil", header: "Profil" }
    ];
  }


  getAllUtilisateur() {
    this.utilisateurService.getAllUtilisateur()
    .subscribe((res:Utilisateur[]) =>{
      this.utilisateurs = res.reverse();
    })
  }


  ajouterUtilisateur() {
    const ref = this.dialogService.open(AddUtilisateurComponent, {
      header: "Nouveau utilisateur",
      width: "50%",
      baseZIndex: 10000,
    });
  }


  active_desactiveUtilisateur(utilisateur) {
    let libelle =[];
   if(utilisateur.active == true){
    libelle.push("desactiver");
    libelle.push("desactivé")
    libelle.push("Desactivation")
   }else{
    libelle.push("activer");
    libelle.push("activé")
    libelle.push("Activation")
   }
   Swal.fire({
    title: 'Voulez-vous '+libelle[0]+' le compte de '+utilisateur.prenom+'?',
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
    this.utilisateurService
      .active_desactiveUtilisateur(utilisateur)
      .subscribe((res: any) => {        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Compte '+libelle[1],
          showConfirmButton: false,
          timer: 1500
        })          
        location.reload();
      }),
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: libelle[2]+'échouée!',
        })
      }
}})
}

  modifierUtilisateur(utilisateur) {
    const ref = this.dialogService.open(UpdateUtilisateurComponent, {
      data: {
        utilisateur: utilisateur,
      },
      header: "Motifier utilisateur",
      width: "50%",
      baseZIndex: 10000,
    });
  }

  visuliserUtilisateur(utilisateur) {    
    const ref = this.dialogService.open(ViewUtilisateurComponent, {
      data: {
        utilisateur: utilisateur,
      },
      header: "Visualiser utilisateur",
      width: "50%",
      baseZIndex: 10000,
    });
  }
}
