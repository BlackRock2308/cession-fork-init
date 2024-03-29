import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  ValidationErrors,
  AbstractControl,
} from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AdhesionService } from "src/app/workstation/service/adhesion/adhesion.service";
import { PME } from "src/app/workstation/model/pme";
import Swal from "sweetalert2";
import { Document } from "src/app/workstation/model/document";
import { FileUploadService } from "src/app/workstation/service/fileUpload.service";
import { PmeService } from "src/app/workstation/service/pme/pmeservice.service";
import { DemandeAdhesion } from "../../../model/demande";
import { Observation } from "src/app/workstation/model/observation";
import { SearchCountryField, CountryISO } from "ngx-intl-tel-input";
import { CentreDesServicesFiscaux } from "src/app/workstation/model/centreDesServicesFiscaux";
import { CentreDesServicesFiscauxService } from "src/app/workstation/service/centreDesServicesFiscaux/centreDesServicesFiscauxService.service";
import { FormeJuridiqueService } from "src/app/workstation/service/formeJuridique/formeJuridiqueService.service";
import { FormeJuridique } from "src/app/workstation/model/formeJuridique";

@Component({
  selector: "app-adhesion",
  templateUrl: "./adhesion.component.html",
  styleUrls: ["./adhesion.component.scss"],
})
export class AdhesionComponent implements OnInit {
  validPattern = "^[a-zA-Z0-9]$"
  dateTime = new Date();
  selectedNINEAFiles: File | null = null;
  selectedRCCMFiles: File | null = null;
  currentFile?: File;
  formeJuridiques: any[];
  selectedCentre: string;
  formeJuridique:FormeJuridique ={};
  centreFiscals: any[];
  centreFiscal: CentreDesServicesFiscaux={}; 
  progress = 0;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  message = "";
  fileInfos?: Observable<any>;
  form!: FormGroup;
  submit: boolean = false;
  pme: PME;
  myFiles: Document[] = [];
  demande: DemandeAdhesion;
  minDate: any;
  observation: Observation = {};
  messageCNI:string='';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adhesionService: AdhesionService,
    private pmeService: PmeService,
    private uploadFileService: FileUploadService,
    private centreDesServicesFiscauxService: CentreDesServicesFiscauxService,
    private formeJuridiqueService : FormeJuridiqueService
  ) { }

  ngOnInit(): void {
    this.getFormeJuridiques();
    this.getCentreFiscals();
    this.message = "Champ obligatoire";
    this.messageCNI = "Renseigner 13 caratères";
    this.form = this.formBuilder.group({
      ninea: ["", [Validators.required, this.matchValuesNINEA()]],
      rccm: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      nineaFile: ["", Validators.required],
      rccmFile: ["", [Validators.required]],
      raisonSocial: ['', [Validators.required]],
      formeJuridique: ['', [Validators.required]],
      centreFiscal: ['', [Validators.required]],
      adressePME: [''],
      enseigne: [''],
      localite: [''],
      controle: [''],
      activitePrincipale: [''],
     // registre: [''],
      prenomRepresentant: ['', [Validators.required]],
      nomRepresentant: ['', [Validators.required]],
      dateCreation: ['', [Validators.required, this.matchValues()]],
      effectifPermanent: [''],
      nombreEtablissementSecondaires: [''],
      chiffresDaffaires: [''],
      cniRepresentant: ['', [Validators.required, this.matchValuesCNI()]],
      dateImmatriculation: ['', [this.matchValues()]],
      telephonePME: ['', [Validators.required]],
      capitalSocial: [''],
      autorisationMinisterielle: ['']
    });

  }

  setMinDate() {
    this.minDate = ((new Date(this.form.value['dateCreation'])).getDate() + 1).toString()
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
  //sélectionner le fichier du ninea
  selectNINEAFile(files: any): void {
    this.selectedNINEAFiles = files.target.files[0];
  }

  matchValuesNINEA(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        !!control.value &&
        control.value.length < 14
        ? null
        : { isMatching: false };
    };
  }
  get f() {
    return this.form.controls;
  }

  //ouvrir la boite de dialogue du répertoire
  handleNINEAClick() {
    document.getElementById("upload-NINEAfile").click();
  }

  //sélectionner le fichier du rccm
  selectRCCMFile(files: any): void {
    //files.target.files.reset()
    this.selectedRCCMFiles = files.target.files[0];
  }

  //ouvrir la boite de dialogue du répertoire
  handleRCCMClick() {
    document.getElementById("upload-RCCMfile").click();
  }

  //envoie du formulaire
  onSubmit() {
    this.submit = true;
    // arrêter si le formulaire est invalide
    if (this.form.invalid) {
      return;
    }
    let telephonePME = this.form.get('telephonePME').value.internationalNumber;
    this.form.get('telephonePME').setValue(telephonePME);
    this.enregistrerPme();
  }

  //enregistrement du pme avec l'appel du service d'enregistrement
  enregistrerPme() {
    this.pme = this.form.value;
    this.pme.formeJuridique = this.formeJuridique;
    this.pme.centreFiscal = this.centreFiscal;
    this.pme.nineaFile = this.selectedNINEAFiles;
    this.pme.rccmFile = this.selectedRCCMFiles;
    let body = {
      ninea: this.pme.ninea,
      rccm: this.pme.rccm,
      email: this.pme.email,
      nineaFile: this.selectedNINEAFiles,
      raisonSocial: this.pme.raisonSocial,
      formeJuridique: this.pme.formeJuridique,
      centreFiscal: this.pme.centreFiscal,
      adressePME: this.pme.adressePME,
      enseigne: this.pme.enseigne,
      localite: this.pme.localite,
      controle: this.pme.controle,
      activitePrincipale: this.pme.activitePrincipale,
      registre: this.pme.registre,
      prenomRepresentant: this.pme.prenomRepresentant,
      nomRepresentant: this.pme.nomRepresentant,
      dateCreation: this.pme.dateCreation,
      effectifPermanent: this.pme.effectifPermanent,
      nombreEtablissementSecondaires: this.pme.nombreEtablissementSecondaires,
      chiffresDaffaires: this.pme.chiffresDaffaires,
      cniRepresentant: this.pme.cniRepresentant,
      dateImmatriculation: this.pme.dateImmatriculation,
      telephonePME: this.pme.telephonePME,
      capitalSocial: this.pme.capitalSocial,
      autorisationMinisterielle: this.pme.autorisationMinisterielle,
      date_soumission: new Date(),
    };
    this.pmeService.postPME(body).subscribe((response: PME) => {
      let data = JSON.parse(JSON.stringify(response));
      let body2 = {
        ninea: this.pme.ninea,
        rccm: this.pme.rccm,
        email: this.pme.email,
        nineaFile: this.selectedNINEAFiles,
        rccmFile: this.selectedRCCMFiles,
        dateDemandeAdhesion: new Date(),
        idPME: data.idPME,
      };
      this.adhesionService
        .postAdhesionDemande(body2)
        .subscribe((response: any) => {
          let data = JSON.parse(JSON.stringify(response));
          if (data && data.idDemande != null) {
            this.uploadFileService.uploadFile("/pme/", data.pme.idPME, this.selectedRCCMFiles, "RCCM").subscribe();
            this.uploadFileService.uploadFile("/pme/", data.pme.idPME, this.selectedNINEAFiles, "NINEA").subscribe();
            Swal.fire({
              html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>Votre demande d'adhésion a été prise en compte.</p><br><p style='font-size: large;font-weight: bold;'>Vous allez recevoir un message de la part du service de cession de créances dans les plus brefs délais.</p>",
              color: "#203359",
              confirmButtonColor: "#99CC33",
              confirmButtonText:
                '<i class="pi pi-check confirm succesButton"></i>OK',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(["../../login"]);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Erreur",
              text: "Erreur lors de la création de la demande.",
            });
          }
        });
    });
  }
}
