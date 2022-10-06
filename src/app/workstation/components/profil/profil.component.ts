import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Profile } from 'src/app/workstation/model/profil';
import { CodeComponent } from './code/code.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers:[
    DialogService
  ]
})
export class ProfilComponent implements OnInit {

  profil: Profile; 
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  code: string;

  constructor(public dialogService: DialogService) { }

  ngOnInit() {
    this.nom = "DIAGNE";
    this.prenom = "Abou";
    this.poste = localStorage.getItem('profil');
    this.email = "abou@gmail.com";
    this.code = "9065";

  }
  modifierCode(){
      const ref = this.dialogService.open(CodeComponent, {
        header: "Changer le code",
        width: '40%',
        height: 'calc(45% - 100px)',
        baseZIndex: 50
      });
     
    }


}