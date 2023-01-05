import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observation } from 'src/app/workstation/model/observation';
import { PME } from 'src/app/workstation/model/pme';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { UtilisateurService } from 'src/app/workstation/service/utilisateur/utilisateur.service';
import Swal from 'sweetalert2';
import { CentreDesServicesFiscauxService } from 'src/app/workstation/service/centreDesServicesFiscaux/centreDesServicesFiscauxService.service';
import { FormeJuridiqueService } from 'src/app/workstation/service/formeJuridique/formeJuridiqueService.service';
import { FormeJuridique } from 'src/app/workstation/model/formeJuridique';
import { CentreDesServicesFiscaux } from 'src/app/workstation/model/centreDesServicesFiscaux';
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
  
  formeJuridiques: any[];
  centreFiscals: any[];
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  submit: boolean = false;
  messageCNI:string='';
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private demandeAdhesionService: DemandesAdhesionService,
    private pmeService: PmeService,
    private utilisateurService: UtilisateurService,
    private centreDesServicesFiscauxService: CentreDesServicesFiscauxService,
    private formeJuridiqueService : FormeJuridiqueService
  ) {
     this.informationsForm = this.formBuilder.group({
    raisonSocial: ['', Validators.required],
    formeJuridique: ['', Validators.required],
    centreFiscal: ['', Validators.required],
    adressePME: [''],
    enseigne: [''],
    localite: [''],
    controle: [''],
    activitePrincipale: [''],
    prenomRepresentant: ['', Validators.required],
    nomRepresentant: ['', Validators.required],
    dateCreation: ['', [Validators.required, this.matchValues()]],
    effectifPermanent: [''],
    nombreEtablissementSecondaires: [''],
    chiffresDaffaires: [''],
    cniRepresentant: ['', [Validators.required, this.matchValuesCNI()]],
    dateImmatriculation: ['' , [Validators.required, this.matchValues()]],
    telephonePME: ['', Validators.required],
    capitalSocial: [''],
    autorisationMinisterielle: ['']
  }); }

  ngOnInit(): void {
    this.message = "Champ obligatoire";
    this.messageCNI = "Renseigner 13 caratères";
    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme = this.demande.pme;
     this.informationsForm.value = this.pme;
      this.getFormeJuridiques();
      this.getCentreFiscals();
    })
  }
  matchValuesCNI(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value && !!control.value &&
        control.value.length === 13 && this.getPremierChiffre(control.value)
        ? null
        : { isMatching: false };
    };
  }

  getPremierChiffre(cni){
    if(cni[0] == '1' || cni[0] == '2' ){
      this.messageCNI = "Renseigner 13 caratères";
      return true;
    }
    this.messageCNI = "CNI doit commencer par 1 ou 2"
    return false;
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
  getFormeJuridiques(){
    this.formeJuridiqueService.getAllFormeJuridique()
    .subscribe((res:FormeJuridique[])=>{
      if(res.length){
        this.formeJuridiques = res;
      }
    })
  }

  getCentreFiscals(){
    this.centreDesServicesFiscauxService.getAllCentreDesServicesFiscaux()
    .subscribe((res:CentreDesServicesFiscaux[])=>{
      if(res.length){
        this.centreFiscals = res;
      }
    })
  }
  prevPage() {

    this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);
  }

  onSubmit() {
    this.submit = true;
    console.log(this.informationsForm);
    
    // if (this.informationsForm.invalid ) {
    //   return;
    // }
    let telephonePME = this.informationsForm.get('telephonePME').value.internationalNumber;
    this.informationsForm.get('telephonePME').setValue(telephonePME);
    this.pme.telephonePME = telephonePME;
    Swal.fire({
      title: 'La demande d\'adhésion sera validée et les informations de la PME mises à jour. Voulez vous continuer?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
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
    this.utilisateurService.createCompte(infoEmail).subscribe((result) => {
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
    this.pmeService.updatePme(this.pme).subscribe((result) => {
      this.demandeAdhesionService.validerAdhesion(this.demande.idDemande).subscribe(
        (result) => {
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