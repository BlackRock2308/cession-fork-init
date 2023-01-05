import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CountryISO, SearchCountryField } from "ngx-intl-tel-input";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { MinistereDepensier } from "src/app/workstation/model/ministereDepensier";
import { Roles } from "src/app/workstation/model/roles";
import { Utilisateur } from "src/app/workstation/model/utilisateur";
import { MinistereDepensierService } from "src/app/workstation/service/ministereDepensier/ministereDepensierService.service";
import { UtilisateurService } from "src/app/workstation/service/utilisateur/utilisateur.service";

@Component({
  selector: "app-visualiser-utlisateur",
  templateUrl: "./visualiser-utlisateur.component.html",
  styleUrls: ["./visualiser-utlisateur.component.scss"],
  providers: [MessageService],
})
export class ViewUtilisateurComponent implements OnInit {
  utilisateur: Utilisateur={};
  roles:Roles[]=[];
  profil:Roles = {};
  ministereDepensiers: MinistereDepensier []=[];
  ministereDepensier: MinistereDepensier ={};
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(
    private utilisateurService : UtilisateurService, private ministereDepensierServices : MinistereDepensierService,
    public activeModal: NgbActiveModal,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit() {
    this.utilisateur = this.config.data.utilisateur;
    this.profil = this.utilisateur.roles[0];
      this.ministereDepensier = this.utilisateur.minister;
    this.getRoles();
    this.getMinistere();
  }
  dismiss() {
    this.ref.close(null);
  }

  getMinistere(){
    this.ministereDepensierServices.getAllMinistereDepensier()
    .subscribe((res:MinistereDepensier[]) =>{
     if(res.length!=0){
      this.ministereDepensiers = res;
     }
    }) 
  }

  getRoles(){
    this.utilisateurService.getAllRoles()
    .subscribe((res:Roles[]) =>{
      if(res.length!=0){
        this.roles = res;
      }
    })
  }

}
