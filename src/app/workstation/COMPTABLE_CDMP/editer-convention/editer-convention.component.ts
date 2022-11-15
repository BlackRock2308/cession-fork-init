import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import Swal from 'sweetalert2';
import { Observation } from '../../model/observation';
import { PME } from '../../model/pme';
import { StatutEnum } from '../../model/statut-enum';
import { ConventionService } from '../../service/convention/convention.service';
import { DemandesAdhesionService } from '../../service/demandes_adhesion/demandes-adhesion.service';
import { DemandesCessionService } from '../../service/demandes_cession/demandes-cession.service';
import { FileUploadService } from '../../service/fileUpload.service';
import { ObservationService } from '../../service/observation/observation.service';

@Component({
  selector: 'app-editer-convention',
  templateUrl: './editer-convention.component.html',
  styleUrls: ['./editer-convention.component.scss']
})
export class EditerConventionComponent implements OnInit {

  documentForm: FormGroup;
  selectedProducts: Document[];
  documents: Document[] = [];
  document: Document;
  selectedFiles: File | null = null;
  selectedFile?: File;
  typesDocument: any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  cols: any[];
  pme: PME;
  demande: any;
  observation:Observation={}

  constructor(
    private router : Router,
    public ref: DynamicDialogRef, private formBuilder: FormBuilder, private pmeService: PmeService
    ,private conventionService : ConventionService,
    private uploadFileService: FileUploadService,
    private demandeAdhesionService: DemandesAdhesionService,
    private demandeCessionService : DemandesCessionService,

    private tokenStorage:TokenStorageService,
    private observationService:ObservationService

    ) { }

  ngOnInit(): void {
    // this.pmeService.getTypesDocument().subscribe(data => {
    //   this.typesDocument = data;
    //   this.typesDocument.push({ nom: "Autres" })
    //   //console.log(this.typesDocument)
    // })
    this.documentForm = this.formBuilder.group({
     // typeDocument: [''],
      file: ['']
    });

    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme=this.demande.pme
      console.log(this.pme,this.demande)

    })
    this.cols = [
      { field: 'typeDocument', header: 'Type Document' },
      { field: 'nomDocument', header: 'Nom Document' },
      { field: 'action', header: 'Action' },
    ];
  }

 //sélectionner le fichier 
 selectFile(files: any): void {
  this.selectedFiles = files.target.files[0];
  console.log(this.selectedFiles);
}

 

  //ouvrir la boite de dialogue du répertoire
  handleClick() {
    document.getElementById('upload-file').click();
  }

  //envoie du formulaire
  onSubmit() {

    this.ref.close();


    this.enregistrerConvention();

    

    // arrêter si le formulaire est invalide
    if (this.documentForm.invalid) {
      return;
    }

    // for (var i = 0; i < this.documents.length; i++) {
    //   this.enregistrerDocument(this.documents[i]);
    // }
  }
  patchDemandeStatut(id: number, statut: any) {
    this.pmeService.patchStatutDemande(id, statut).subscribe()
  }

  //enregistrement du document avec l'appel du service d'enregistrement
  private async enregistrerConvention() {

    let body = {
      
      file: this.selectedFiles,
      idDemande:this.demande.idDemande,
      dateConvention: new Date(),
      pme:{
        idPME:this.pme.idPME
    }
    


    }
    console.log(body)
    
   
    this.conventionService.postConvention(body)
      .subscribe((response: any) => {
      let data = JSON.parse(JSON.stringify(response));
        if (data && data.idConvention != null) {
          this.uploadFileService.uploadFile('/conventions/', response.idConvention, this.selectedFiles, 'AUTRE').subscribe(data=>console.log(data)
           )
          
          }
      
      },
      (error) => {},
      () => {
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut={}      
        this.observation.idDemande = this.demande.idDemande;
      this.observation.statut.libelle =StatutEnum.conventionGeneree;
      this.observationService.postObservation(this.observation).subscribe(data => console.log(data))

      Swal.fire({

        html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a bien été enregistrée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
        color:"#203359",
        confirmButtonColor:"#99CC33",
        confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
        allowOutsideClick:false,
        
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['workstation/comptable/convention_cession'])
        }})
  
        setTimeout(() => {
          location.reload()
         }, 1500);
     
  
      }
      )
      

  }

  delete(document: Document) {
    var myIndex = this.documents.indexOf(document);
    if (myIndex !== -1) {
      this.documents.splice(myIndex, 1);
    }
    console.log(this.documents)
  }

  dismiss() {
    this.ref.close();
  }
}


interface Document {

  type?: String;
  file?: File;
}
interface typeDocument {
  nom?: String;
}