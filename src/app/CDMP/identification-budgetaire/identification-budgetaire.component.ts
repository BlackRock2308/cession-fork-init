import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-identification-budgetaire',
  templateUrl: './identification-budgetaire.component.html',
  styleUrls: ['./identification-budgetaire.component.scss']
})
export class IdentificationBudgetaireComponent implements OnInit {
  selectedFiles: File[]=[];
  selectedFile?:File;
  documentForm: FormGroup;
  documents:Document[]=[];
  document:Document;
  cols: any[];

  constructor(    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

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

  
}
interface Document{
    
  type?:String;
  file?:File;
}
