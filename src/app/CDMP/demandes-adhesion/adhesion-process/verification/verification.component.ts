import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/workstation/model/product';
import {SelectItem} from 'primeng/api';
import { Route } from '@angular/router';
import { BasicInfo, DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  product: Product;
  verificationForm: FormGroup;
  router: Route;
  basicInfo:BasicInfo;
  id: number;

  constructor(private demandesAdhesionService:DemandesAdhesionService,    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    //Récupérer l'id de la demande en cours de vérification
    this.demandesAdhesionService.getDemandeObs().subscribe(data=>this.id=data.id);

    //formulaire de la première étape de vérification à patcher
    this.verificationForm = this.formBuilder.group({
      id: [''],
      nineaValide: ['', [Validators.required]],
      pmeActive: ['']
  });

  // remplir l'id dans le formulaire
  this.verificationForm.controls.id.setValue(this.id);
  }

    //envoie du formulaire
    onSubmit() {
      // arrêter si le formulaire est invalide
      if (this.verificationForm.invalid) {
          return;
      }
      //console.log(this.verificationForm);

      //appeller la fonction d'enregistrement 
      this.enregistrerBasicInformation();

      //le modal doit se fermer
      //this.communicationService.setDialogObs(false);
      window.location.reload()

      
  }

  //fonction d'enregistrement des informations basic tel l'état du ninea et de la pme
  enregistrerBasicInformation() {
    this.basicInfo=this.verificationForm.value;
    console.log(this.basicInfo)
    this.demandesAdhesionService.patchBasicInformation(this.id,this.basicInfo).subscribe(data=>console.log(data));
  }

  //afficher les champs du formulaire de l'état de la pme au cas où le ninea est valide
  nineaValide():any{
    const targetDiv = document.getElementById("actif");
    targetDiv.style.display = "inline";

    const btn = document.getElementById("valider");
    btn.style.display = "flex";
  
}

  //fermer les champs du formulaire de l'état de la pme au cas où le ninea est valide
  nineaInvalide():any{
  const targetDiv = document.getElementById("actif");
  targetDiv.style.display = "none";

  const btn = document.getElementById("valider");
  btn.style.display = "flex";

}



}
