import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControlOptions,
  ValidationErrors,
  AbstractControl,
} from "@angular/forms";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AdhesionService } from "src/app/workstation/service/adhesion/adhesion.service";
import { PME } from "src/app/workstation/model/pme";
import Swal from "sweetalert2";
import { Document } from "src/app/workstation/model/document";
import { FileUploadService } from "src/app/workstation/service/fileUpload.service";
import { PmeService } from "src/app/workstation/service/pme/pmeservice.service";
import { DemandeAdhesion } from "../../../model/demande";
import { Observation } from "src/app/workstation/model/observation";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { StatutEnum } from "src/app/workstation/model/statut-enum";
import { ObservationService } from "src/app/workstation/service/observation/observation.service";

@Component({
  selector: "app-adhesion",
  templateUrl: "./adhesion.component.html",
  styleUrls: ["./adhesion.component.scss"],
})
export class AdhesionComponent implements OnInit {
  selectedNINEAFiles: File | null = null;
  selectedRCCMFiles: File | null = null;
  currentFile?: File;
  progress = 0;
  message = "";
  fileInfos?: Observable<any>;
  form!: FormGroup;
  submit = false;
  pme: PME;
  myFiles: Document[] = [];
  demande: DemandeAdhesion;
  observation: Observation = {};
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adhesionService: AdhesionService,
    private pmeService: PmeService,
    private uploadFileService: FileUploadService,
    private tokenStorage: TokenStorageService,
    private observationService: ObservationService
  ) {}

  ngOnInit(): void {
    this.message = "Champs obligatoire";
    this.form = this.formBuilder.group({
      ninea: ["", [Validators.required, this.matchValuesNINEA()]],
      rccm: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      nineaFile: ["", Validators.required],
      rccmFile: ["", [Validators.required]],
    });
  }

  //sélectionner le fichier du ninea
  selectNINEAFile(files: any): void {
    this.selectedNINEAFiles = files.target.files[0];
    console.log(this.selectedNINEAFiles);
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
    this.enregistrerPme();
  }

  //enregistrement du pme avec l'appel du service d'enregistrement
  enregistrerPme() {
    this.pme = this.form.value;
    this.pme.nineaFile = this.selectedNINEAFiles;
    this.pme.rccmFile = this.selectedRCCMFiles;
    let body = {
      ninea: this.pme.ninea,
      rccm: this.pme.rccm,
      email: this.pme.email,
      nineaFile: this.selectedNINEAFiles,
      rccmFile: this.selectedRCCMFiles,
      date_soumission: new Date(),
    };
    this.pmeService.postPME(body).subscribe((response: PME) => {
      let data = JSON.parse(JSON.stringify(response));
      console.log(data);
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
            this.uploadFileService.uploadFile( "/pme/", data.pme.idPME, this.selectedRCCMFiles, "RCCM" ) .subscribe();
            this.uploadFileService.uploadFile( "/pme/", data.pme.idPME, this.selectedNINEAFiles, "NINEA").subscribe();
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
              text: "Votre demande d'adhésion a été prise en compte.",
            });
          }
        });
    });
  }
}
