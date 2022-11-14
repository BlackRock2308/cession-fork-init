
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Convention } from 'src/app/workstation/model/demande';
import { PME } from 'src/app/workstation/model/pme';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signerconvention-pme',
  templateUrl: './signerconvention-pme.component.html',
  styleUrls: ['./signerconvention-pme.component.scss']
})
export class SignerconventionPMEComponent implements OnInit {

  form!: FormGroup;
  convention: Convention;
  codePIN: string;
  demande: any;
  pme : PME;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogRef,
    private demandeCessionService : DemandesCessionService,
    private tokenStorage : TokenStorageService

  ) { }

  ngOnInit(): void {

  //   this.demandesCessionService.getDemandesCessionByPme(this.tokenStorage.getPME().idPME).subscribe(data => {
  //     this.demandes = data
  //     console.log(this.demandes,data)
  // });
    this.form = this.formBuilder.group({
      convention: ['', Validators.required],
      codePIN : ['' , Validators.required]
    });

    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demande = data;
     

      console.log(this.demande,data)

    })
  }

  get f(){
    return this.form.controls;
  }
  dismiss() {
    this.ref.close();
  }

  onSubmit() {
    this.ref.close();

    this.signerConventionPME();
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

  private signerConventionPME() {

 
    var  idDemande = this.demande.idDemande
    this.codePIN=this.form.value['codePIN']

    this.demandeCessionService.signerConventionPME(this.codePIN,this.tokenStorage.getUser().idUtilisateur,idDemande).subscribe
    ((response: any) => {
      console.log(response)

    })
}
}