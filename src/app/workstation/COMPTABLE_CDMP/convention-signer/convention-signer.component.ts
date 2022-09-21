import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { Convention } from '../../model/convention';

@Component({
  selector: 'app-convention-signer',
  templateUrl: './convention-signer.component.html',
  styleUrls: ['./convention-signer.component.scss']
})
export class ConventionSignerComponent implements OnInit {

  selectedCONVENTIONFiles: File | null = null;
  form!: FormGroup;
  convention: Convention;
  codePIN: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      convention: ['', Validators.required]
    });
  }

  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {
    this.ref.close();
    Swal.fire({
      html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>Votre code a été enregistré.</p>",
      color: "#203359",
      confirmButtonColor: "#A6C733",
      confirmButtonText: '<i class="pi pi-check"></i>OK',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/comptable/convention_cession'])
      }
    })
  }

  //enregistrement du pme avec l'appel du service d'enregistrement
  private valider() {
    this.convention = this.form.value;

  }
}
