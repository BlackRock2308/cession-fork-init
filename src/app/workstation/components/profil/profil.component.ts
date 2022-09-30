import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Profile } from 'src/app/workstation/model/profil';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profil: Profile; 
  nom: string;
  prenom: string;
  email: string;
  poste: string;

  constructor() { }

  ngOnInit() {
    this.nom = "DIAGNE";
    this.prenom = "Abou";
    this.poste = localStorage.getItem('profil');
    this.email = "abou@gmail.com";

  }

}