
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ConventionService } from 'src/app/workstation/service/convention/convention.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signerconvention-pme',
  templateUrl: './signerconvention-pme.component.html',
  styleUrls: ['./signerconvention-pme.component.scss']
})
export class SignerconventionPMEComponent implements OnInit {

  form!: FormGroup;
  convention: any;
  codePIN: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,private config: DynamicDialogConfig,
    public ref: DynamicDialogRef, private conventionService:ConventionService,
    private tokenStorage : TokenStorageService,
    public observationService:ObservationService

  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      convention: ['', Validators.required],
      codePIN : ['' , Validators.required]
    });  
    this.convention = this.config.data.convention; 
  }

  get f(){
    return this.form.controls;
  }
  dismiss() {
    this.ref.close();
  }

  onSubmit() {
    this.ref.close();
    Swal.fire({
      title: 'Voulez-vous continuer la signature',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Annuler`,
      confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.signerConvention();
      } else if (result.isDenied) {
        Swal.fire('Signature annulée', '', 'info')
      }
    })
    
 
  }

  signerConvention() {
    this.codePIN=this.form.value['codePIN'];
    this.conventionService.signerConventionPME(this.codePIN,this.tokenStorage.getUser().idUtilisateur,this.convention.idConvention)
    .subscribe((response) => {      
      if(response==true){
      Swal.fire({
        position: 'center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>Convention Signée avec succès.</p><br><p style='font-size: large;font-weight: bold;'></p>",
        color: "#203359",
        confirmButtonColor: "#99CC33",
        confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
        allowOutsideClick: false,
  
      }).then(() => {
  
        this.router.navigate(['workstation/pme/convention_cession'])
      })

      setTimeout(() => {
        location.reload()
      },1600);    
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Le code pin saisi est incorrect!',
          confirmButtonColor: "#A6C733",
          confirmButtonText: '<i class="pi pi-check"></i>OK', })
      }
    }
    )
}
}