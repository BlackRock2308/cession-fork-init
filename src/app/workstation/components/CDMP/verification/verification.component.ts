import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Observation } from 'src/app/workstation/model/observation';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';
import { BasicInfo, DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
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
  observation:Observation={};

  constructor(private router: Router, private demandeAdhesionService: DemandesAdhesionService,
    private adhesionDemandeService: AdhesionService, private pmeService: PmeService,
    private observationService:ObservationService,private tokenStorage:TokenStorageService) { }

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
      color: "#203359",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>Continuer',
      allowOutsideClick: false,
      confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF'

    }).then((result) => {
      if (result.isConfirmed) {
        this.verifierDemandeAdhesion(body);
      }
    })

  }



  verifierDemandeAdhesion(body: any) {

    /*this.demandeAdhesionService.patchBasicInformation(this.id,body).subscribe(data=>{
      console.log(this.demande,data)
    })*/
    this.demandeAdhesionService.rejeterDemande(this.demande.idDemande).subscribe(
      (response) => {},
      (error) => {},
      () => {
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut={}          
        this.observation.demandeid = this.demande.idDemande;
          this.observation.statut.libelle =StatutEnum.adhesionRejetee;
          this.observationService.postObservation(this.observation).subscribe(data => console.log(data))

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

    )


  }
}
