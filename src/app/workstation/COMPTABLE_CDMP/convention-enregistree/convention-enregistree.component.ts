import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { Convention } from '../../model/convention';

@Component({
  selector: 'app-convention-enregistree',
  templateUrl: './convention-enregistree.component.html',
  styleUrls: ['./convention-enregistree.component.scss']
})
export class ConventionEnregistreeComponent implements OnInit {

  selectedCONVENTIONFiles: File | null = null;
  form!: FormGroup;
  convention : Convention;
  constructor(
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      convention: ['', Validators.required]
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

    Swal.fire({

      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a bien été soumise.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color:"#203359",
      confirmButtonColor:"#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/comptable/convention_cession'])
      }})
    // arrêter si le formulaire est invalide
    if (this.form.invalid) {
        return;
    }
  

  this.enregistrerConvention();

  
  

  
}


//enregistrement du pme avec l'appel du service d'enregistrement
private enregistrerConvention() {
this.convention=this.form.value;
this.convention.conv_file=this.selectedCONVENTIONFiles;
//fonction à continuer 
console.log(this.convention);
/*this.adhesionService.postPME(this.pme)
    .subscribe(() => {
       })*/
    
}
}
