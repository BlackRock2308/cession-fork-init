import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import Swal from 'sweetalert2';

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
    private demandeAdhesionService: DemandesAdhesionService,
    private adhesionService: AdhesionService, 
    private pmeService: PmeService
  ) { }

  ngOnInit(): void {

    this.informationsForm = this.formBuilder.group({
      denomination: [''],
      formuleJuridique: [''],
      centreFiscal: [''],
      adresse: [''],
      enseigne: [''],
      localite: [''],
      controle: [''],
      activite_principal: [''],
      registre: [''],
      representantLegal: [''],
      date_creation: [''],
      effectif: [''],
      etablissements: [''],
      chiffre: [''],
      cniRepresentant: [''],
      dateImmatriculation: [''],
      telephone: ['']
    });

    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data;

    })
  }

  prevPage() {

    this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);
  }

  onSubmit() {

    //arreter si li formulaire n'est pas valide

    this.enregistrerInfos()

    //fermer la boite de dialogue
    this.demandeAdhesionService.setDialog(false)

  }
  enregistrerInfos() {
    //this.demandeAdhesionService.patchDemande(this.demande.id,this.demande).subscribe(data=>console.log(data))
    //this.demandeAdhesionService.patchDemande(this.demande.id,this.informationsForm.value).subscribe(data=>console.log(data))
    this.pmeService.patchPME(this.demande.id, this.informationsForm.value).subscribe((data) => {
      console.log(data)
    });
    this.pmeService.patchPME(this.demande.id, this.demande).subscribe((data) => {
      console.log(data)
    });
    //à enlever après connexion avec le backend
    this.adhesionService.delateAdhesionDemande(this.demande.id).subscribe()

    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été completée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color: "#203359",
      confirmButtonColor: "#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick: false

    })

    setTimeout(() => {
      location.reload()
    }, 1500);

  }

}
