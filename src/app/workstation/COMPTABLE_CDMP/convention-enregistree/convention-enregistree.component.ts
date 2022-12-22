import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Swal from 'sweetalert2';
import { Convention } from '../../model/convention';
import { Observation } from '../../model/observation';
import { PME } from '../../model/pme';
import { StatutEnum } from '../../model/statut-enum';
import { ConventionService } from '../../service/convention/convention.service';
import { DemandesCessionService } from '../../service/demandes_cession/demandes-cession.service';
import { FileUploadService } from '../../service/fileUpload.service';
import { ObservationService } from '../../service/observation/observation.service';


@Component({
  selector: 'app-convention-enregistree',
  templateUrl: './convention-enregistree.component.html',
  styleUrls: ['./convention-enregistree.component.scss']
})
export class ConventionEnregistreeComponent implements OnInit {

  selectedCONVENTIONFiles: File | null = null;
  form!: FormGroup;
  conventions: Convention[] = [];

  convention: Convention;
  pme: PME;
  statutEnum: StatutEnum;
  demande: any;

  observation: Observation = {}
  constructor(
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private demandeCessionService: DemandesCessionService,
    private conventionService: ConventionService,
    private uploadFileService: FileUploadService, private config: DynamicDialogConfig,
    private tokenStorage: TokenStorageService,
    private observationService: ObservationService


  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      convention: ['', Validators.required]
    });

    this.demande = this.config.data.demande;
    this.pme = this.demande.pme
    this.convention = this.demande.conventions[0];

    this.form = this.formBuilder.group({

      nineaFile: ['']
    });
  }

  handleCONVENTIONClick() {
    document.getElementById('upload-CONVENTIONfile').click();
  }
  //sélectionner le fichier dE la convention
  selectCONVENTIONFile(files: any): void {
    this.selectedCONVENTIONFiles = files.target.files[0];
    console.log(this.selectedCONVENTIONFiles);
  }

  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {

    this.ref.close();

    // arrêter si le formulaire est invalide
    if (this.form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Voulez-vous soumettre la convention chargée ?',
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
        this.conventionTransmise();
      } else if (result.isDenied) {
        Swal.fire('Transmission annulée', '', 'info')
      }
    })

  }

  private conventionTransmise() {
    let body = {
      file: this.selectedCONVENTIONFiles,
      idConvention: this.convention.idConvention
    }

    this.conventionService.transmettreConvention(this.convention, this.convention.idConvention).subscribe(
      data => { console.log( data) }),

      this.uploadFileService.uploadFile('/conventions/', this.convention.idConvention, this.selectedCONVENTIONFiles, 'CONVENTION').subscribe(
        data => { console.log(data) }),

      this.demandeCessionService.updateStatut(this.demande.idDemande, StatutEnum.ConventionTransmise)
        .subscribe((response: any) => {

          Swal.fire({

            position: 'center',
            icon: 'success',
            title: 'La convention a bien été transmise.',
            showConfirmButton: false,
            timer: 2500

          }).then(() => {
            this.router.navigate(['workstation/comptable/convention_cession'])

          })
          setTimeout(() => {
            location.reload()
          }, 1600);
        })
    this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
    this.observation.statut = {}
    this.observation.demandeid = this.demande.idDemande;
    this.observation.statut.libelle = StatutEnum.ConventionTransmise;
    this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
  }

}
