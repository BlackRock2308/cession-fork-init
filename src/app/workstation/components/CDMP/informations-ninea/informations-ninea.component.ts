import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';

@Component({
  selector: 'app-informations-ninea',
  templateUrl: './informations-ninea.component.html',
  styleUrls: ['./informations-ninea.component.scss']
})
export class InformationsNineaComponent implements OnInit {
  informationsForm: any;
  demande: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private demandeAdhesionService:DemandesAdhesionService
    ) { }

  ngOnInit(): void {

    this.informationsForm = this.formBuilder.group({
      denomination: [''],
      formuleJuridique: [''],
      centreFiscal: [''],
      adresse: [''],
      representantLegal: [''],
      cniRepresentant: [''],
      dateImmatriculation: [''],
      telephone: ['']
  });

  this.demandeAdhesionService.getDemandeObs().subscribe(data=>
    {
      this.demande=data;
      
    })
  }

prevPage() {
    
  this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);
}

onSubmit(){

  //arreter si li formulaire n'est pas valide
  

  //
  this.enregistrerInfos()

  //fermer la boite de dialogue
  this.demandeAdhesionService.setDialog(false)

  //
  this.router.navigate(['workstation/cdmp/demandes_en_cours/']);


}
  enregistrerInfos() {
    this.demandeAdhesionService.patchDemande(this.demande.id,this.demande).subscribe(data=>console.log(data))
    this.demandeAdhesionService.patchDemande(this.demande.id,this.informationsForm.value).subscribe(data=>console.log(data))
  }

}
