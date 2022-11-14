import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Swal from 'sweetalert2';
import { Convention } from '../../model/convention';
import { DemandesCessionService } from '../../service/demandes_cession/demandes-cession.service';

@Component({
  selector: 'app-convention-signer',
  templateUrl: './convention-signer.component.html',
  styleUrls: ['./convention-signer.component.scss']
})
export class ConventionSignerComponent implements OnInit {

  selectedCONVENTIONFiles: File | null = null;
  form!: FormGroup;
  demande : any;
  convention: Convention;
  codePIN: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogRef,
    private demandeCessionService : DemandesCessionService,
    private tokenStorage : TokenStorageService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      convention: ['', Validators.required],
      codePIN : ['' , Validators.required]

    });

    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demande = data;
     

      console.log(this.demande,data)

    })
  }



  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {
    this.ref.close();

    this.signerConventionDG();
    Swal.fire({
      html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>Votre convention a été signée.</p>",
      color: "#203359",
      confirmButtonColor: "#A6C733",
      confirmButtonText: '<i class="pi pi-check"></i>OK',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/comptable/convention_cession'])
      }
    })

    setTimeout(() => {
      location.reload()
     }, 1500);
 
  }

 
  private signerConventionDG() {

 
    var  idDemande = this.demande.idDemande
    this.codePIN=this.form.value['codePIN']

    this.demandeCessionService.signerConventionDG(this.codePIN,this.tokenStorage.getUser().idUtilisateur,idDemande).subscribe
    ((response: any) => {
      console.log(response)

    })
}
}
