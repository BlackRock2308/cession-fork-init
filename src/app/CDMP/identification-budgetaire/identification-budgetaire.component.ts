import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identification-budgetaire',
  templateUrl: './identification-budgetaire.component.html',
  styleUrls: ['./identification-budgetaire.component.scss']
})
export class IdentificationBudgetaireComponent implements OnInit {
  selectedFiles: File[];

  constructor() { }

  ngOnInit(): void {
  }

  //ajouter le fichier sélectionné au répertoire de fichier
  selectFile(files: any): void {
    if(this.selectedFiles==null){
        this.selectedFiles=files.target.files;
      }
    else{
        this.selectedFiles.push(files.target.files[0]);
    }
    console.log(this.selectedFiles);
  }

  //ouvrir la boite de dialogue du répertoire
  handleClick() {
    document.getElementById('upload-file').click();
  }
}
