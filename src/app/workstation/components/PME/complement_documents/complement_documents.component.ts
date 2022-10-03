import { Component, OnInit } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { MenuItem } from 'primeng/api';
import { DocumentService } from 'src/app/workstation/service/document/document.service';

@Component({
  selector: 'app-complement-documents',
  templateUrl: './complement_documents.component.html',
  styleUrls: ['./complement_documents.component.scss']
})
export class ComplementDocumentsComponent implements OnInit {
  selectedFiles: File[]=[];
  selectedFile?:File;
  documentForm: FormGroup;
  documents:Document[]=[];
  document:Document;
  cols: any[];
  selectedProducts: Document[];
  typesDocument:any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  demandeNantissementInfos:any;
  items: MenuItem[];
  home: MenuItem;

  constructor(    
    private formBuilder: FormBuilder,
    private pmeService:PmeService,
    private demandeAdhesionService:DemandesAdhesionService,
    private documentService:DocumentService) { }

  ngOnInit(): void {

    this.pmeService.getTypesDocument().subscribe(data=>{
      this.typesDocument=data;
      this.typesDocument.push({nom:"Autres"})
      //console.log(this.typesDocument)
    })

    this.documentForm= this.formBuilder.group({
      type: [''],
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


//récupérer les informations du nantissement en cours de modification
  this.demandeAdhesionService.getDemandenantissementObs().subscribe(data=>this.demandeNantissementInfos=data);
  console.log(this.demandeNantissementInfos)

  this.documentService.getDocuments().subscribe(data => {
    this.documents = data
    console.log(this.documents)
});
  }

  //ajouter le fichier sélectionné au répertoire de fichier
  selectFile(files: any): void {
    
    this.document=this.documentForm.value;
    this.document.file=files.target.files[0];
    this.document.nom=files.target.files[0].name;
    this.documents.push(this.document);
    files.target.files=null;
    console.log(this.documents)
        
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

      for(var i=0;i<this.documents.length;i++){
        this.enregistrerDocument(this.documents[i]);


      }

      this.patchDemandeStatut(this.demandeNantissementInfos.id,{"statut":"Completee"})
    
      
  }
  patchDemandeStatut(id:number, statut: any) {
    this.pmeService.patchStatutDemande(id,statut).subscribe()
  }
  
  
  //enregistrement du pme avec l'appel du service d'enregistrement
  private enregistrerDocument(document:Document) {
    //fonction à continuer 
    console.log(this.documents);
    this.pmeService.postDocument(document)
        .subscribe(() => {
           })
        
  }

  delete(document:Document){
    var myIndex = this.documents.indexOf(document);
    if (myIndex !== -1) {
      this.documents.splice(myIndex, 1);
  }
  console.log(this.documents)
  }
  
}
interface Document{
    
  type?:String;
  file?:File;
  nom?:String;
}

