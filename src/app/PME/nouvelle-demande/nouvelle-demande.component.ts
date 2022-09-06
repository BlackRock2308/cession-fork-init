import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PME } from 'src/app/workstation/model/pme';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';

@Component({
  selector: 'app-nouvelle-demande',
  templateUrl: './nouvelle-demande.component.html',
  styleUrls: ['./nouvelle-demande.component.scss']
})
export class NouvelleDemandeComponent implements OnInit {

  selectedNINEAFiles: File | null = null;
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
  ) { }

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
  
    this.enregistrerBon();
    
}


//enregistrement du bbn d'engagement avec l'appel du service d'enregistrement
private enregistrerBon() {
  this.pme=this.form.value;
  this.pme.nineaFile=this.selectedNINEAFiles;
  //fonction à continuer 
  console.log(this.pme);
  /*this.adhesionService.postPME(this.pme)
      .subscribe(() => {
         })*/
      
}


}