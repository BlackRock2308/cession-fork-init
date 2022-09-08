import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/workstation/model/product';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  product: Product;
  verificationForm: FormGroup;


  constructor( private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    //this.productService.getProductObs().subscribe(product => this.product = product);
    
    this.verificationForm = this.formBuilder.group({
      ninea: ['', Validators.required],
      rccm: ['', Validators.required],
      nineaValide: ['', [Validators.required]],
      pmeActive: ['', Validators.required]
  });
  this.verificationForm.controls.pmeActive.setValue(false);
  }

    //envoie du formulaire
    onSubmit() {
      // arrêter si le formulaire est invalide
      if (this.verificationForm.invalid) {
          return;
      }
      console.log(this.verificationForm)
      //this.enregistrerDemande();
      
  }
  enregistrerDemande() {
    throw new Error('Method not implemented.');
  }

  nineaValide():any{
    const targetDiv = document.getElementById("actif");
    const btn = document.getElementById("oui");
    targetDiv.style.display = "flex";
  
}


}
