import { Component, OnInit } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { MenuItem } from 'primeng/api';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { FileUploadService } from 'src/app/workstation/service/fileUpload.service';
import { Router } from '@angular/router';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Observation } from 'src/app/workstation/model/observation';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complement-documents',
  templateUrl: './complement_documents.component.html',
  styleUrls: ['./complement_documents.component.scss']
})
export class ComplementDocumentsComponent implements OnInit {
  selectedFiles: File[]=[];
  selectedFile?:File;
  documentForm: FormGroup;
  documents:any[]=[];
  newDocuments:any[]=[];
  document:any;
  observationLibelle: string;

  documentPresentation:Document;
  cols: any[];
  selectedProducts: Document[];
  typesDocument:any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  demandeNantissementInfos:any;
  items: MenuItem[];
  home: MenuItem;
  observation:Observation={}

  constructor(    
    private formBuilder: FormBuilder,
    private demandeAdhesionService:DemandesAdhesionService,
    private breadcrumbService: BreadcrumbService,
    private demandeCessionService:DemandesCessionService,
    private documenService:FileUploadService,
    private router:Router,
    private observationService:ObservationService,
    private tokenStorage:TokenStorageService
    ) { 
      this.breadcrumbService.setItems([
        { label: 'Liste des demandes ', routerLink: ['pme/demandes_en_cours'] },
        { label: 'Compléter les documents' }
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['pme/demandes_en_cours'] });
    }

  ngOnInit(): void {

    
//récupérer les informations du nantissement en cours de modification
  this.demandeAdhesionService.getDemandenantissementObs().subscribe(data=>{
    this.demandeNantissementInfos=data
    this.documents=this.documents.concat(data.bonEngagement.documents)
    this.documents=this.documents.concat(data.pme.documents)
    this.documents=this.documents.concat(data.documents)
    console.log(this.demandeNantissementInfos)


  })

  this.observationService.getObservationByDemandeCessionANDStatut(this.demandeNantissementInfos.idDemande,this.demandeNantissementInfos.statut.libelle).subscribe(
    data => {
        this.observationLibelle=data.libelle
        console.log(this.observationLibelle)
    })

    this.documentForm= this.formBuilder.group({
      typeDocument: [''],
      file: ['']
  });
  this.cols = [
    {field: 'typeDocument', header: 'Type Document'},
    {field: 'nomDocument', header: 'Nom Document'},
    {field: 'dateSauvegarde', header: 'Date sauvegarde'},
    
    {field: 'action', header: 'Action'},
];
this.items = [
  { label: 'Liste de Demandes ', url: '/pme/demandes_en_cours/complement_documents' },
  { label: 'Compléter les documents' }
];

this.home = { icon: 'pi pi-home', url: '' };

this.typesDocument=[
  {
    "type": "Autre",
    "nom": "Autre"
  },
  {
    "type": "CNI",
    "nom": "Carte National d'identité"
  },
  {
    "type": "BUSSINESS_PLAN",
    "nom": "BUSSINESS PLAN"
  },
  {
    "type": "FACTURE",
    "nom": "FACTURE"
  },
  {
    "type": "ETAT_FINANCIER",
    "nom": "ETAT FINANCIER"
  },
  {
    "type": " DECHARGE",
    "nom": " DECHARGE"
  }

]


  }

  //ajouter le fichier sélectionné au répertoire de fichier
  selectFile(files: any): void {
    
    this.document=this.documentForm.value;
    this.document.file=files.target.files[0];
    this.document.nom=this.document.file.name;
    this.documents.push(this.document);
    this.newDocuments.push(this.document);
    files.target.files=null;
    console.log(this.newDocuments)        
  }

  //ouvrir la boite de dialogue du répertoire
  handleClick() {
    document.getElementById('upload-file').click();
  }

    //envoie du formulaire
    onSubmit() {


      
      // arrêter si le formulaire est invalide
      if (this.documentForm.invalid) {
          return;
      }

      Swal.fire({
        title: 'Voulez-vous soumettre complément de dossier',
        showDenyButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
        confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          for(var i=0;i<this.newDocuments.length;i++){
            this.enregistrerDocument(this.newDocuments[i]);
    
    
          }
    
          this.completerDemande(this.demandeNantissementInfos.idDemande)
        } else if (result.isDenied) {
          Swal.fire('Soumission abandonnée', '', 'info')
        }
      })


      

      
      //location.reload()
      //this.router.navigate(['workstation/pme/demandes_en_cours'])
    
      
  }
  async completerDemande(id:number):Promise<any> {
    
      await this.demandeCessionService.completeDemande(id).subscribe(response=>{
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut={}        
        this.observation.demandeid =  this.demandeNantissementInfos.idDemande;
        this.observation.statut.libelle =StatutEnum.completee;
        console.log(this.observation,response)
        this.observationService.postObservation(this.observation).subscribe(
          (data) => {console.log(data)},
          
        (error) =>{},
        () =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>Votre demande a bien été envoyée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
            color: "#203359",
            confirmButtonColor: "#99CC33",
            confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
            allowOutsideClick: false,
      
          }).then(() => {
      
            this.router.navigate(['workstation/pme/demandes_en_cours'])
          })
    }

  )
      
    
    
    
  })
}
  
  
  //enregistrement du pme avec l'appel du service d'enregistrement
  private async enregistrerDocument(document:Document):Promise<any>{
    //fonction à continuer 
    try{
      let file=await this.documenService.uploadFile('/demandes/',this.demandeNantissementInfos.idDemande,document.file,document.typeDocument).subscribe()
      console.log(file)
    }
    catch(error){
      console.log(error)
    }
        
  }

  delete(document:Document){
    var myIndex = this.documents.indexOf(document);
    var myIndex0 = this.newDocuments.indexOf(document);
    if (myIndex !== -1) {
      this.documents.splice(myIndex, 1);
  }
  if (myIndex0 !== -1) {
    this.newDocuments.splice(myIndex0, 1);
}
  console.log(this.documents)
  }
  
}
interface Document{
    
  typeDocument?:string;
  file?:File;
  nom?:String;
}

