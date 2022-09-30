import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';

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
  selectedFiles: File[] = [];
  selectedFile?: File;
  typesDocument: any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  cols: any[];

  constructor(public ref: DynamicDialogRef, private formBuilder: FormBuilder, private pmeService: PmeService) { }

  ngOnInit(): void {
    this.pmeService.getTypesDocument().subscribe(data => {
      this.typesDocument = data;
      this.typesDocument.push({ nom: "Autres" })
      //console.log(this.typesDocument)
    })
    this.documentForm = this.formBuilder.group({
      typeDocument: [''],
      file: ['']
    });
    this.cols = [
      { field: 'typeDocument', header: 'Type Document' },
      { field: 'nomDocument', header: 'Nom Document' },
      { field: 'action', header: 'Action' },
    ];
  }

  //ajouter le fichier sélectionné au répertoire de fichier
  selectFile(files: any): void {

    this.document = this.documentForm.value;
    this.document.file = files.target.files[0];
    this.documents.push(this.document);
    files.target.files = null;
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

    for (var i = 0; i < this.documents.length; i++) {
      this.enregistrerDocument(this.documents[i]);
    }
  }
  patchDemandeStatut(id: number, statut: any) {
    this.pmeService.patchStatutDemande(id, statut).subscribe()
  }

  //enregistrement du pme avec l'appel du service d'enregistrement
  private enregistrerDocument(document: Document) {
    //fonction à continuer 
    console.log(this.documents);
    this.pmeService.postDocument(document)
      .subscribe(() => {
      })

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