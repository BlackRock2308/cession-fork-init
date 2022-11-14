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
  documentPresentation:Document;
  cols: any[];
  selectedProducts: Document[];
  typesDocument:any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  demandeNantissementInfos:any;
  items: MenuItem[];
  home: MenuItem;
  observation:Observation

  constructor(    
    private formBuilder: FormBuilder,
    private pmeService:PmeService,
    private demandeAdhesionService:DemandesAdhesionService,
    private documentService:DocumentService,
    private breadcrumbService: BreadcrumbService,
    private demandeCessionService:DemandesCessionService,
    private documenService:FileUploadService,
    private router:Router,
    private observationService:ObservationService,
    private tokenStorage:TokenStorageService
    ) { 
      this.breadcrumbService.setItems([
        { label: 'Liste de Demandes ', routerLink: ['pme/demandes_en_cours '] },
        { label: 'Compléter les documents' }
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] });
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

    this.documentForm= this.formBuilder.group({
      typeDocument: [''],
      file: ['']
  });
  this.cols = [
    {field: 'typeDocument', header: 'Type Document'},
    {field: 'nomDocument', header: 'Nom Document'},
    {field: 'action', header: 'Action'},
];
this.items = [
  { label: 'Liste de Demandes ', url: '/#/workstation/pme/demandes_en_cours ' },
  { label: 'Compléter les documents' }
];

this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };

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

      for(var i=0;i<this.newDocuments.length;i++){
        this.enregistrerDocument(this.newDocuments[i]);


      }

      this.completerDemande(this.demandeNantissementInfos.idDemande)

      
      //location.reload()
      this.router.navigate(['workstation/pme/demandes_en_cours'])
    
      
  }
  async completerDemande(id:number):Promise<any> {
    
    try{
      await this.demandeCessionService.completeDemande(id).subscribe(response=>{
        let body={
          utilisateur:{
            idUtilisateur:this.tokenStorage.getUser().idUtilisateur
          },
          demande:{
            idDemande:response.idDemande
          },
          statut:{
            libelle:StatutEnum.completee
          },
        }
        this.observationService.postObservation(body).subscribe(data => console.log(data))
      })
      
    }
    catch(error){
      console.log(error)
    }
    
  }
  
  
  //enregistrement du pme avec l'appel du service d'enregistrement
  private async enregistrerDocument(document:Document):Promise<any>{
    //fonction à continuer 
    try{
      let file=await this.documenService.uploadFile('/pme/',this.demandeNantissementInfos.pme.idPME,document.file,document.typeDocument).subscribe()
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

