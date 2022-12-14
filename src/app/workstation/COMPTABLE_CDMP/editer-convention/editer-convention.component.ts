import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import Swal from 'sweetalert2';
import { Convention } from '../../model/convention';
import { Observation } from '../../model/observation';
import { StatutEnum } from '../../model/statut-enum';
import { ConventionService } from '../../service/convention/convention.service';
import { ObservationService } from '../../service/observation/observation.service';

@Component({
  selector: 'app-editer-convention',
  templateUrl: './editer-convention.component.html',
  styleUrls: ['./editer-convention.component.scss']
})
export class EditerConventionComponent implements OnInit {


  dateEdit:Date;
  //selectedFiles: File | null = null;
  //selectedFile?: File;
  typesDocument: any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  demande: any;
  observation:Observation={}
  remarqueJuriste:string;
  decode:number;
  convention:any;
  constructor(
    private router : Router,
    private ref: DynamicDialogRef, private pmeService: PmeService
    ,private conventionService : ConventionService, private config: DynamicDialogConfig,
    private tokenStorage:TokenStorageService,
    private observationService:ObservationService

  ) { }

  ngOnInit(): void {
    this.dateEdit = new Date();
   this.demande = this.config.data.demande;
   if(this.demande.conventions.length){
    this.convention = {      
      idDemande:this.demande.idDemande,
      remarqueJuriste: this.demande.conventions[0].remarqueJuriste,
      idConvention: this.demande.conventions[0].idConvention
    }
   }else{
    this.convention = {
      remarqueJuriste:"",
      idDemande:this.demande.idDemande,
      pme:{
        idPME:this.demande.pme.idPME
    }
    }
    console.log(this.convention);
    
   }
  }



  //ouvrir la boite de dialogue du répertoire
  handleClick() {
    document.getElementById('upload-file').click();
  }

  //envoie du formulaire
  onSubmit() {

    this.ref.close();

    // arrêter si le formulaire est invalide
    // if (this.documentForm.invalid) {
    //   return;
    // }

    Swal.fire({
      title: 'Voulez-vous enregistrer la convention',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Annuler`,
      confirmButtonColor: '#99CC33FF',
      denyButtonColor: '#981639FF',
      cancelButtonColor: '#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.enregistrerConvention();
      }
      else if (result.isDenied) {
        Swal.fire('Enregistrement annulée', '', 'info')
      }
    })
  }
  patchDemandeStatut(id: number, statut: any) {
    this.pmeService.patchStatutDemande(id, statut).subscribe()
  }

  //enregistrement du document avec l'appel du service d'enregistrement
  enregistrerConvention() {   
    if(this.demande.conventions[0] !=null){
      this.conventionService.corrigerConvention(this.convention)
      .subscribe((response: any) =>  {
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut={}      
        this.observation.demandeid = this.demande.idDemande;
      this.observation.statut.libelle =StatutEnum.conventionCorrigee;
      this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
      Swal.fire({

        html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a été corrigée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
        color:"#203359",
        icon:'success',
        confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
        allowOutsideClick:false,
        showConfirmButton:false
        
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['workstation/comptable/convention_cession'])
        }})
        setTimeout(() => {
          location.reload()
         }, 1500);
     
  
      },
      (error) => {
        console.log(error)      }
      )
    }
   else{
    this.conventionService.postConvention(this.convention)
    .subscribe((response: any) =>  {
      this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
      this.observation.statut={}      
      this.observation.demandeid = this.demande.idDemande;
    this.observation.statut.libelle =StatutEnum.conventionGeneree;
    this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
    Swal.fire({

      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a bien été enregistrée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color:"#203359",
      icon:'success',
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      showConfirmButton:false
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/comptable/convention_cession'])
      }})
      setTimeout(() => {
        location.reload()
       }, 1500);
   

    },
    (error) => {
      console.log(error)      }
    )
   }
  }

  dismiss() {
    this.ref.close();
  }


}