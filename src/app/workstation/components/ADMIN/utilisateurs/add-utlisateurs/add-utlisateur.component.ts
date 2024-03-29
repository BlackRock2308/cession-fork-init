import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { MinistereDepensier } from "src/app/workstation/model/ministereDepensier";
import { Roles } from "src/app/workstation/model/roles";
import { Utilisateur } from "src/app/workstation/model/utilisateur";
import { MinistereDepensierService } from "src/app/workstation/service/ministereDepensier/ministereDepensierService.service";
import { UtilisateurService } from "src/app/workstation/service/utilisateur/utilisateur.service";
import Swal from "sweetalert2";
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
@Component({
  selector: "app-add-utlisateur",
  templateUrl: "./add-utlisateur.component.html",
  styleUrls: ["./add-utlisateur.component.scss"],
  providers: [MessageService],
})
export class AddUtilisateurComponent implements OnInit {
  form!: FormGroup;
  utilisateur: Utilisateur={};
  message:string;
  submit: boolean=false;
  roles:Roles[]=[];
  profil:Roles = {};
  ministereDepensiers: MinistereDepensier []=[];
  ministereDepensier: MinistereDepensier ={}; 
  separateDialCode = false;
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
    this.utilisateur.roles=[];
    this.message = "Champ obligatoire";
    this.form = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email]],
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
     if(res.length){
      this.ministereDepensiers = res;
     }
    }) 
  }

  getRoles(){
    this.utilisateurService.getAllRoles()
    .subscribe((res:Roles[]) =>{
      if(res.length){
        this.roles = res;
      }
    })
  }

  get f() {
    return this.form.controls;
  }


  rolesChange(event) {
    if(this.profil?.libelle == "ORDONNATEUR"){
      //this.form.controls['profil'].setValidators(['', Validators.required]);
      this.form.controls['ministere'].addValidators([Validators.required])
    }else{
      this.form.controls['ministere'].removeValidators(Validators.required)
    }
    
  }


  onSubmitForm() {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }  
    this.utilisateur.roles.push(this.profil);
    this.utilisateur.telephone = this.form.get('telephone').value.internationalNumber;
    this.utilisateur.minister = this.ministereDepensier;
    this.utilisateurService
      .addUtilisateur(this.utilisateur)
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
          title: 'Utilisateur enregistré avec succès.',
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
          text: 'Création échouée',
        })
  }
}

}
