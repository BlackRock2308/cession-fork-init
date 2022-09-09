import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';

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


  constructor(    private formBuilder: FormBuilder,private pmeService:PmeService) { }

  ngOnInit(): void {

    this.pmeService.getTypesDocument().subscribe(data=>{
      this.typesDocument=data;
      this.typesDocument.push({nom:"Autres..."})
      console.log(this.typesDocument)
    })

    this.documentForm= this.formBuilder.group({
      typeDocument: [''],
      file: [''],
  });

  this.cols = [
    {field: 'ninea', header: 'NINEA'},
    {field: 'rccm', header: 'RCCM'},
    {field: 'datesoumission', header: 'Date Soumission'},
    {field: 'rating', header: 'Reviews'},
    {field: 'inventoryStatus', header: 'Status'}
];
  }

  //ajouter le fichier sélectionné au répertoire de fichier
  selectFile(files: any): void {
    
    this.document=this.documentForm.value;
    this.document.file=files.target.files[0];
    this.documents.push(this.document)
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
        this.enregistrerDocuments(this.documents[i]);


      }
    
      
  }
  
  
  //enregistrement du pme avec l'appel du service d'enregistrement
  private enregistrerDocuments(document:Document) {
    //fonction à continuer 
    console.log(this.documents);
    /*this.adhesionService.postPME(this.pme)
        .subscribe(() => {
           })*/
        
  }
  filtertypeDocument(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.typesDocument.length; i++) {
        const typeDocument = this.typesDocument[i];
        if (typeDocument.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(typeDocument);
        }
    }

    this.filteredtypeDocument = filtered;
}
  
}
interface Document{
    
  type?:String;
  file?:File;
}

interface typeDocument{
  nom?:String;
}
