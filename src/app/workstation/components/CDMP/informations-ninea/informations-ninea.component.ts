import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Observation } from 'src/app/workstation/model/observation';
import { PME } from 'src/app/workstation/model/pme';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { UtilisateurService } from 'src/app/workstation/service/utilisateur/utilisateur.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-informations-ninea',
  templateUrl: './informations-ninea.component.html',
  styleUrls: ['./informations-ninea.component.scss']
})
export class InformationsNineaComponent implements OnInit {
  dateTime = new Date();
  validPattern = "^[a-zA-Z0-9]$"
message:string = "";
  informationsForm: any;
  demande: any;
  pme: PME;
  idPme: number;
  observation: Observation = {};
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  submit: boolean = true;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private demandeAdhesionService: DemandesAdhesionService,
    private pmeService: PmeService,
    private utilisateurService: UtilisateurService,

  ) { this.informationsForm = this.formBuilder.group({
    raisonSocial: ['', Validators.required],
    formeJuridique: ['', Validators.required],
    centreFiscal: ['', Validators.required],
    adressePME: ['', Validators.required],
    enseigne: ['', Validators.required],
    localite: ['', Validators.required],
    controle: ['', Validators.required],
    activitePrincipale: ['', Validators.required],
    prenomRepresentant: ['', Validators.required],
    nomRepresentant: ['', Validators.required],
    dateCreation: ['', [Validators.required, this.matchValues()]],
    effectifPermanent: ['', Validators.required],
    nombreEtablissementSecondaires: ['', Validators.required],
    chiffresDaffaires: ['', Validators.required],
    cniRepresentant: ['', [Validators.required, this.matchValuesCNI()]],
    dateImmatriculation: ['', [Validators.required, this.matchValues()]],
    telephonePME: ['', Validators.required],
    capitalSocial: ['', Validators.required],
    autorisationMinisterielle: ['', Validators.required]
  }); }

  ngOnInit(): void {
    this.message = "Champ obligatoire"
    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme = this.demande.pme
      console.log(this.pme)

    })
  }
  matchValuesCNI(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value && !!control.value &&
        control.value.length === 13
        ? null
        : { isMatching: false };
    };
  }
  matchValues(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value <= new Date()
        ? null
        : { isMatching: false };
    };
  }
  get f() {
    return this.informationsForm.controls;
  }

  prevPage() {

    this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);
  }

  onSubmit() {
    // if (this.informationsForm.invalid || this.f['cniRepresentant'].invalid || this.f['dateCreation'].invalid || this.f['dateImmatriculation'].invalid || this.f['telephonePME'].invalid ) {
    //   return;
    // }
    this.submit = false;
    let telephonePME = this.informationsForm.get('telephonePME').value.internationalNumber;
    this.informationsForm.get('telephonePME').setValue(telephonePME);

    Swal.fire({
      title: 'La demande d\'adhésion sera validée et les informations de la PME mises à jour. Voulez vous continuer?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Annuler`,
      confirmButtonColor: '#99CC33FF',
      denyButtonColor: '#981639FF',
      cancelButtonColor: '#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.validerDemandeAdhesion()
        this.demandeAdhesionService.setDialog(false)
        setTimeout(() => {
          location.reload()
        }, 1000);
      } else if (result.isDenied) {
        Swal.fire('Traitement de la demande non effective!', '', 'info')
      }
    })



    //fermer la boite de dialogue
    this.demandeAdhesionService.setDialog(false)

  }

  //A integrer apres le deploiement du microservice de notification
  async createCompte() {
    let infoEmail = {
      email: this.pme.email
    }
    console.log(infoEmail)
    this.utilisateurService.createCompte(infoEmail).subscribe((result) => {
      console.log(result)
    })
  }

  validerDemandeAdhesion() {
    let body2 = {
      hasninea: this.demande.hasninea,
      isactive: this.demande.isactive
    }
    let body = {
      idPME: this.pme.idPME,
      ...this.informationsForm.value, ...body2
    }
    this.pmeService.updatePme(body).subscribe((result) => {
      this.demandeAdhesionService.validerAdhesion(this.demande.idDemande).subscribe(
        (result) => {
          console.log(result)
        },
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été completée et validée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
            color: "#203359",
            confirmButtonColor: "#99CC33",
            confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
            allowOutsideClick: false
          })

        })
        this.createCompte()
    })
  }

}
interface Forme {
  name: string,
  code: string
}