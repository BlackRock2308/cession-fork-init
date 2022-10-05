import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import Swal from 'sweetalert2';

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

  constructor(
    private router : Router,
    public ref: DynamicDialogRef, private formBuilder: FormBuilder, private pmeService: PmeService) { }

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

    Swal.fire({

      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a bien été soumise.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color:"#203359",
      confirmButtonColor:"#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/comptable/convention_cession'])
      }})


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