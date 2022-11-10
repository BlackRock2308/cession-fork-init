import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';
import { BasicInfo, DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
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

  constructor(private router: Router, private demandeAdhesionService: DemandesAdhesionService,
    private adhesionDemandeService: AdhesionService, private pmeService: PmeService) { }

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
      hasninea : this.demande.hasninea,
      //pmeActive:this.demande.pmeActive
    }

    //fermer la boite de dialogue
    this.demandeAdhesionService.setDialog(false)

    Swal.fire({
      position: 'center',
      title: 'Etes-vous sur de vouloir rejeter la demande?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      color: "#203359",
      confirmButtonColor: "#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick: false,

    }).then((result) => {
      if (result.isConfirmed) {
        this.verifierDemandeAdhesion(body);
        Swal.fire({
          title: 'Rejetée!',
          text: 'La demande d\'adhesion bien été rejetée.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
         location.reload()
        }, 1500);



      }
    })

  }



  verifierDemandeAdhesion(body: any) {

    /*this.demandeAdhesionService.patchBasicInformation(this.id,body).subscribe(data=>{
      console.log(this.demande,data)
    })*/
    this.demandeAdhesionService.rejeterDemande(this.demande.idDemande).subscribe()


  }
}
