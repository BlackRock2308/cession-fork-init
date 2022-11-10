import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PME } from 'src/app/workstation/model/pme';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { UtilisateurService } from 'src/app/workstation/service/utilisateur/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informations-ninea',
  templateUrl: './informations-ninea.component.html',
  styleUrls: ['./informations-ninea.component.scss']
})
export class InformationsNineaComponent implements OnInit {
  informationsForm: any;
  demande: any;
  pme : PME;
  idPme:number;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private demandeAdhesionService: DemandesAdhesionService,
    private pmeService: PmeService,
    private utilisateurService : UtilisateurService
  
  ) { }

  ngOnInit(): void {

    this.informationsForm = this.formBuilder.group({
      raisonSocial: [''],
      formeJuridique: [''],
      centreFiscal: [''],
      adresse: [''],
      enseigne: [''],
      localite: [''],
      controle: [''],
      activitePrincipale: [''],
      registre: [''],
      representantLegal: [''],
      date_creation: [''],
      effectif: [''],
      etablissements: [''],
      chiffre: [''],
      cniRepresentant: [''],
      dateImmatriculation: [''],
      telephonePME: [''],
      capitalsocial : ['']
    });

    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme=this.demande.pme

    })
  }

  prevPage() {

    this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);
  }

  onSubmit() {

   

    this.enregistrerInfos()

    //fermer la boite de dialogue
    this.demandeAdhesionService.setDialog(false)

  }

  async patchPme (){
    let body2 = {
      hasninea : this.demande.hasninea,
      isactive : this.demande.isactive
    }
    let body={
      ...this.informationsForm.value , ...body2
     }

     console.log(JSON.stringify(body))
    
     this.pmeService.patchPme(this.pme.idPME,body).subscribe((result)=>{
      console.log(result)
      })
   
      
    }


    //A integrer apres le deploiement du microservice de notification
  //  async createCompte(){
  //     let infoEmail = {
  //       email : this.pme.email
  //     }
  //     console.log(infoEmail)
  //     this.utilisateurService.createCompte(infoEmail).subscribe((result)=>{
  //       console.log(result)
  //       })
  //   }
  
 

   enregistrerInfos() {
   
   this.validerDemandeAdhesion();


    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été completée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color: "#203359",
      confirmButtonColor: "#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick: false

    })

    setTimeout(() => {
      location.reload()
    }, 1500);

    console.log(this.pme)
  }

  
  async validerDemandeAdhesion() {

  
    await this.patchPme()
      console.log(this.pme.idPME)
     this.demandeAdhesionService.validerAdhesion(this.demande.idDemande).subscribe(
       (result)=>{
         console.log(result)
        }
     )
  //  await this.createCompte()
  }

  

}
