import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Swal from 'sweetalert2';
import { Convention } from '../../model/convention';
import { Observation } from '../../model/observation';
import { StatutEnum } from '../../model/statut-enum';
import { ConventionService } from '../../service/convention/convention.service';
import { DemandesCessionService } from '../../service/demandes_cession/demandes-cession.service';
import { ObservationService } from '../../service/observation/observation.service';

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
  observation:Observation={};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogRef,
    private demandeCessionService : DemandesCessionService,
    private tokenStorage : TokenStorageService,
    private conventionService : ConventionService,
    private observationService:ObservationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      convention: ['', Validators.required],
      codePIN : ['' , Validators.required],
      decote : ['']

    });

    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.convention = this.demande.conventions[0]
     

      console.log(this.convention.valeurDecote)

    })
  }



  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {
    this.ref.close();

    Swal.fire({
      title: 'Signer la convention?',
      showDenyButton: true,
      confirmButtonText: 'Valider',
      denyButtonText: `Annuler`,
      confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.signerConventionDG();
           } 
        else if (result.isDenied) {
        Swal.fire('Signature annulée', '', 'info')
      }
    })
    
    
 
  }

 
  private async signerConventionDG() {

    var  idDemande = this.demande.idDemande
    this.codePIN=this.form.value['codePIN']


    await this.demandeCessionService.signerConventionDG(this.codePIN,this.tokenStorage.getUser().idUtilisateur,idDemande).subscribe
    ((response: any) => {
      console.log(response.body)
      if(response.body){

        let body = {
          valeurDecote: this.form.value['decote'],
        }
    
        if (this.form.value['decote'] !== null) {
          this.conventionService.updateDecote( this.convention.idConvention,this.form.value['decote'])
          .subscribe((response: any) => {
            console.log(response)}
      )}
      
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
      this.observation.statut={}      
      this.observation.demandeid = idDemande;
      this.observation.statut.libelle =StatutEnum.conventionSigneeParDG;
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
  
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['workstation/comptable/convention_cession'])
        }
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
          confirmButtonText: '<i class="pi pi-check"></i>OK',
          confirmButtonColor:'#99CC33FF',
      

        })
      }
    },
    (error) => {},
    () => {
      
    }
    )
    
}
}
