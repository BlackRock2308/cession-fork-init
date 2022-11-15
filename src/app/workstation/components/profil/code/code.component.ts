import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { UtilisateurService } from '../../../service/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../model/utilisateur';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  form!: FormGroup;
  user: Utilisateur;
  code:string;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private utilisateurService: UtilisateurService,
    private tokenStorage:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.user = this.tokenStorage.getUser()

  }

  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {
    this.valider();
    this.ref.close();
  }

  //enregistrement du pme avec l'appel du service d'enregistrement
  private valider() {
    this.user.codePin=this.code
    this.utilisateurService.updateUtilisateur(this.user).subscribe(
      (response) => {},
      (error) => {},
      () => {
        this.utilisateurService.getByIdemail(this.tokenStorage.getUser().email).subscribe(
          
          data => {
            console.log(data,this.tokenStorage.getUser().email)
            this.tokenStorage.saveUser(data)
          }
        )
        
        Swal.fire(
          'Modifiée!',
          'Vôtre code Pin a été modifié avec succès.',
          'success'
        )
        setTimeout(() => {
          location.reload()
         }, 1500);      }
    )

  }
}
