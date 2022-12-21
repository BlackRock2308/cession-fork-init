import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observation } from 'src/app/workstation/model/observation';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  existant: boolean = false;

  active: boolean = false;

  demande: any;
  id: any;
  observation: Observation = {};

  constructor(private router: Router, private demandeAdhesionService: DemandesAdhesionService) { }

  ngOnInit(): void {
    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data
      console.log('ttttttt' + JSON.stringify(this.demande))
      this.id = data.id
    })
  }

  nextPage() {
    this.demande.isactive = this.active
    this.demande.hasninea = this.existant
    console.log(this.demande)
    this.demandeAdhesionService.setDemandeObs(this.demande)
    this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/informations_ninea']);
  }

  onSubmit() {
    this.demande.hasninea = this.existant
    //this.demande.pmeActive=this.active

    let body = {
      hasninea: this.demande.hasninea,
      //pmeActive:this.demande.pmeActive
    }

    //fermer la boite de dialogue
    this.demandeAdhesionService.setDialog(false)

    Swal.fire({
      position: 'center',
      title: 'Etes-vous sûr de vouloir rejeter la demande?',
      icon: 'warning',
      showCancelButton: true,
      color: "#203359",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>Continuer',
      allowOutsideClick: false,
      confirmButtonColor: '#99CC33FF',
      denyButtonColor: '#981639FF',
      cancelButtonColor: '#333366FF'

    }).then((result) => {
      if (result.isConfirmed) {
        this.verifierDemandeAdhesion(body);
      }
    })

  }


  verifierDemandeAdhesion(body: any) {

    this.demandeAdhesionService.rejeterDemande(this.demande.idDemande).subscribe(
      (response) => { },
      (error) => { },
      () => {

        Swal.fire({
          title: 'Rejetée!',
          text: 'La demande d\'adhesion bien été rejetée.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          location.reload()
        }, 1500);
      }

    )


  }
}
