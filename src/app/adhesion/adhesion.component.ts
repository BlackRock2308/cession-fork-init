import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbService } from '../core/breadcrumb/breadcrumb.service';
import {MessageService} from 'primeng/api';
import { FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule, FormBuilder, AbstractControlOptions } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdhesionService } from './adhesion.service';
import { PME } from '../model/pme';

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
    
}


//enregistrement du pme avec l'appel du service d'enregistrement
private enregistrerPme() {
  this.pme=this.form.value;
  this.pme.nineaFile=this.selectedNINEAFiles;
  this.pme.rccmFile=this.selectedRCCMFiles;
  //fonction à continuer 
  console.log(this.pme);
  /*this.adhesionService.postPME(this.pme)
      .subscribe(() => {
         })*/
      
}
}