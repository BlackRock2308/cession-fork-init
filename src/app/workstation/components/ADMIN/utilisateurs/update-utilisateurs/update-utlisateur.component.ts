import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CountryISO, SearchCountryField } from "ngx-intl-tel-input";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { MinistereDepensier } from "src/app/workstation/model/ministereDepensier";
import { Roles } from "src/app/workstation/model/roles";
import { Utilisateur } from "src/app/workstation/model/utilisateur";
import { MinistereDepensierService } from "src/app/workstation/service/ministereDepensier/ministereDepensierService.service";
import { UtilisateurService } from "src/app/workstation/service/utilisateur/utilisateur.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-utlisateur",
  templateUrl: "./update-utlisateur.component.html",
  styleUrls: ["./update-utlisateur.component.scss"],
  providers: [MessageService],
})
export class UpdateUtilisateurComponent implements OnInit {
  form!: FormGroup;
  utilisateur: Utilisateur={};
  message:string;
  submit: boolean=false;
  roles:Roles[]=[];
  profil:Roles = {};
  ministereDepensiers: MinistereDepensier []=[];
  ministereDepensier: MinistereDepensier ={};
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService : UtilisateurService, private ministereDepensierServices : MinistereDepensierService,
    public activeModal: NgbActiveModal,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit() {
    this.message = "Champ obligatoire";
    this.utilisateur = this.config.data.utilisateur;
    this.profil = this.utilisateur.roles[0];
      this.ministereDepensier = this.utilisateur.minister;
    this.form = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      adresse: [''],
      ministere: [''],
      profil: ['', Validators.required]
    });
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

  rolesChange(event) {
    if(this.profil.libelle == "ORDONNATEUR"){
      //this.form.controls['profil'].setValidators(['', Validators.required]);
      this.form.controls['ministere'].addValidators(Validators.required)
    }else{
      this.form.controls['ministere'].removeValidators(Validators.required)
    }
    
  }

  get f() {
    return this.form.controls;
  }

  onSubmitForm() {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }   
    this.utilisateur.roles=[];
    this.utilisateur.roles.push(this.profil);
    this.utilisateur.telephone = this.form.get('telephone').value.internationalNumber;
    this.utilisateur.minister = this.ministereDepensier;
    this.utilisateurService
      .updateUser(this.utilisateur)
      .subscribe((res: any) => {
        this.dismiss();
        if(res.status == "409" ||res.status == "400"){
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Ce email existe',
          })
         }else{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Utilisateur modifié avec succès.',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          location.reload()
        },1600);
      }
      }),
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Modification échouée',
        })
  }
}

}
