
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Convention } from 'src/app/workstation/model/demande';
import { Observation } from 'src/app/workstation/model/observation';
import { PME } from 'src/app/workstation/model/pme';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
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

  observation:Observation={};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogRef,
    private demandeCessionService : DemandesCessionService,
    private tokenStorage : TokenStorageService,
    private observationService:ObservationService

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

    Swal.fire({
      title: 'Continuer la signature?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Continuer',
      denyButtonText: `Annuler`,
      confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.signerConventionPME();
      } else if (result.isDenied) {
        Swal.fire('Signature annulée', '', 'info')
      }
    })
    
 
  }

  private signerConventionPME() {

 
    var  idDemande = this.demande.idDemande
    this.codePIN=this.form.value['codePIN']

    this.demandeCessionService.signerConventionPME(this.codePIN,this.tokenStorage.getUser().idUtilisateur,idDemande).subscribe
    ((response: any) => {
      if(response.body){
      console.log(response)
      this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
      this.observation.statut={}            
      this.observation.demandeid =  this.demande.idDemande;
      this.observation.statut.libelle =StatutEnum.conventionSigneeParPME;
      this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
    
    
    
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
  
      
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Le code pin saisi est incorrect!',
          confirmButtonColor: "#A6C733",
          confirmButtonText: '<i class="pi pi-check"></i>OK',        })
      }
    }
    )
}
}