import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { UtilisateurService } from '../../../service/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../model/utilisateur';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  form!: FormGroup;
  user: Utilisateur;
  code: string = "9065";
  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.user = JSON.parse(localStorage.getItem('user'))

  }

  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {
    this.valider();
    this.ref.close();
    Swal.fire({
      html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>Votre code a été modifié avec succès.</p>",
      color: "#203359",
      confirmButtonColor: "#A6C733",
      confirmButtonText: '<i class="pi pi-check"></i>OK',
      allowOutsideClick: false,
    }).then((result) => {
      
    })
  }

  //enregistrement du pme avec l'appel du service d'enregistrement
  private valider() {
    this.code = this.form.value;
    this.utilisateurService.updateUtilisateur(this.user)

  }
}
