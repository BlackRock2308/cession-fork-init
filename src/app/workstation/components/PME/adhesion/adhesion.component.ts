import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MessageService} from 'primeng/api';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule, FormBuilder, AbstractControlOptions } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';
import { PME } from 'src/app/workstation/model/pme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adhesion',
  templateUrl: './adhesion.component.html',
  styleUrls: ['./adhesion.component.scss']
})
export class AdhesionComponent implements OnInit {

  selectedNINEAFiles: File | null = null;
  selectedRCCMFiles: File | null = null;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  form!: FormGroup;
  submitted = false;
  pme: PME;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adhesionService: AdhesionService,
  ) {
}

  ngOnInit(): void {
        this.form = this.formBuilder.group({
            ninea: ['', Validators.required],
            rccm: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            nineaFile: ['', Validators.required],
            rccmFile: ['', [Validators.required]],
        });
  }


//sélectionner le fichier du ninea
  selectNINEAFile(files: any): void {
    this.selectedNINEAFiles = files.target.files[0];
    console.log(this.selectedNINEAFiles);
  }


//ouvrir la boite de dialogue du répertoire
  handleNINEAClick() {
    document.getElementById('upload-NINEAfile').click();
  }


  //sélectionner le fichier du rccm
  selectRCCMFile(files: any): void {
    this.selectedRCCMFiles = files.target.files[0];
    console.log(this.selectedRCCMFiles);
  }


  //ouvrir la boite de dialogue du répertoire
  handleRCCMClick() {
    document.getElementById('upload-RCCMfile').click();
  }


  //envoie du formulaire
  onSubmit() {
    // arrêter si le formulaire est invalide
    if (this.form.invalid) {
        return;
    }
  
    this.enregistrerPme();

    Swal.fire({
      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>Votre demande d'adhésion a été prise en compte.</p><br><p style='font-size: large;font-weight: bold;'>Vous allez recevoir un message de la part du service de cession de créances dans les plus brefs délais.</p>",
      color:"#203359",
      confirmButtonColor:"#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['../../login'])
      }})

    

    
}


//enregistrement du pme avec l'appel du service d'enregistrement
private enregistrerPme() {
  this.pme=this.form.value;
  this.pme.nineaFile=this.selectedNINEAFiles;
  this.pme.rccmFile=this.selectedRCCMFiles;
  console.log(this.pme);
  let body={
    ninea:this.pme.ninea,
    rccm:this.pme.rccm,
    email:this.pme.email,
    nineaFile:this.selectedNINEAFiles,
    rccmFile:this.selectedRCCMFiles,
    date_soumission:new Date()
  }
  this.adhesionService.postPME(body)
      .subscribe(data=>console.log(this.pme,data));
  this.adhesionService.postAdhesionDemande(body).subscribe()
}


}
