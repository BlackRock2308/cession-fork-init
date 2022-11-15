import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Swal from 'sweetalert2';
import { Convention } from '../../model/convention';
import { Observation } from '../../model/observation';
import { PME  } from '../../model/pme';
import { StatutEnum  } from '../../model/statut-enum';
import { ConventionService } from '../../service/convention/convention.service';
import { DemandesCessionService  } from '../../service/demandes_cession/demandes-cession.service';
import { FileUploadService } from '../../service/fileUpload.service';
import { ObservationService } from '../../service/observation/observation.service';


@Component({
  selector: 'app-convention-enregistree',
  templateUrl: './convention-enregistree.component.html',
  styleUrls: ['./convention-enregistree.component.scss']
})
export class ConventionEnregistreeComponent implements OnInit {

  selectedCONVENTIONFiles: File | null = null;
  form!: FormGroup;
  conventions:Convention[] = [] ;

  convention:Convention; 
  pme: PME;
  statutEnum : StatutEnum;
  demande: any;

  observation:Observation
  constructor(
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private demandeCessionService : DemandesCessionService,
    private conventionService : ConventionService,
    private uploadFileService: FileUploadService,
    private tokenStorage:TokenStorageService,
    private observationService:ObservationService


  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      convention: ['', Validators.required]
    });


    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme=this.demande.pme
      this.convention=this.demande.conventions[0]
      console.log(this.pme,this.demande , this.convention.idConvention)

    })

    this.form = this.formBuilder.group({
      
       nineaFile: ['']
     });
  }

  handleCONVENTIONClick() {
    document.getElementById('upload-CONVENTIONfile').click();
  }
  //sélectionner le fichier dE la convention
  selectCONVENTIONFile(files: any): void {
    this.selectedCONVENTIONFiles = files.target.files[0];
    console.log(this.selectedCONVENTIONFiles);
  }

  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {

    this.ref.close();


    this.conventionTransmise();
    // arrêter si le formulaire est invalide
    if (this.form.invalid) {
      return;
    }


    

  }

  

  private async conventionTransmise() {
   
    let body = {
      
      file: this.selectedCONVENTIONFiles,
      idConvention:this.convention.idConvention
      
  }
  console.log(body)

    

    


      
        await this.uploadFileService.uploadFile('/conventions/', this.convention.idConvention, this.selectedCONVENTIONFiles, 'AUTRE').subscribe(
          data=>{console.log(data)},
          ()=>{},
          ()=>{
            this.demandeCessionService.updateStatut(this.demande.idDemande,StatutEnum.ConventionTransmise)
            .subscribe((response: any) => {
              console.log(response)
              console.log(StatutEnum.ConventionTransmise)
          },
          ()=>{},
          ()=>{
            Swal.fire({

              html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a bien été soumise.</p><br><p style='font-size: large;font-weight: bold;'></p>",
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
             }, 1500);
          })
          this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
          this.observation.statut={}            
          this.observation.idDemande =  this.demande.idDemande;
            this.observation.statut.libelle =StatutEnum.ConventionTransmise;
          this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
          }

         )
        
      

}
}
