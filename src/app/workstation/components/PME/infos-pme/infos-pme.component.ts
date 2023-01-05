import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CentreDesServicesFiscaux } from 'src/app/workstation/model/centreDesServicesFiscaux';
import { FormeJuridique } from 'src/app/workstation/model/formeJuridique';
import { Observation } from 'src/app/workstation/model/observation';
import { PME } from 'src/app/workstation/model/pme';
import { CentreDesServicesFiscauxService } from 'src/app/workstation/service/centreDesServicesFiscaux/centreDesServicesFiscauxService.service';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { FormeJuridiqueService } from 'src/app/workstation/service/formeJuridique/formeJuridiqueService.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { UtilisateurService } from 'src/app/workstation/service/utilisateur/utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-infos-pme',
  templateUrl: './infos-pme.component.html',
  styleUrls: ['./infos-pme.component.scss']
})
export class InfosPMEComponent implements OnInit {
  dateTime = new Date();
  validPattern = "^[a-zA-Z0-9]$"
message:string = "";
  informationsForm: any;
  demande: any;
  formeJuridiques: any[];
  formeJuridique:FormeJuridique ={};
  centreFiscals: any[];
  centreFiscal: CentreDesServicesFiscaux={}; 
  pme: PME;
  idPme: number;
  observation: Observation = {};
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  submit: boolean = false;
  messageCNI:string = '';
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private demandeAdhesionService: DemandesAdhesionService,
    private pmeService: PmeService,
    private tokenStorage: TokenStorageService,
    private centreDesServicesFiscauxService: CentreDesServicesFiscauxService,
    private formeJuridiqueService : FormeJuridiqueService) { 
      this.informationsForm = this.formBuilder.group({
        raisonSocial: [''],
        formeJuridique: ['', Validators.required],
        centreFiscal: ['', Validators.required],
        adressePME: [''],
        enseigne: [''],
        email : [''] , 
        localite: [''],
        controle: [''],
        ninea : [''],
        rccm : [''],
        activitePrincipale: [''],
        prenomRepresentant: [''],
        nomRepresentant: ['', Validators.required],
        dateCreation: ['', [Validators.required, this.matchValues()]],
        effectifPermanent: [''],
        nombreEtablissementSecondaires: [''],
        chiffresDaffaires: [''],
        cniRepresentant: ['', [Validators.required, this.matchValuesCNI()]],
        dateImmatriculation: ['' , [this.matchValues()]],
        telephonePME: ['', Validators.required],
        capitalSocial: [''],
        autorisationMinisterielle: ['']
      });
    }

  ngOnInit(): void {
    this.messageCNI = "Renseigner 13 caratères";
    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme = this.demande.pme;
      console.log(this.pme);      
    this.formeJuridique = this.pme.formeJuridique;
    this.centreFiscal = this.pme.centreFiscal;
    this.getFormeJuridiques();
    this.getCentreFiscals();
  })

}
matchValuesCNI(): (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value && !!control.value &&
      control.value.length === 13 && this.getPremierChiffre(control.value)
      ? null
      : { isMatching: false };
  };
}

getPremierChiffre(cni){
  if(cni[0] == '1' || cni[0] == '2' ){
    this.messageCNI = "Renseigner 13 caratères";
    return true;
  }
  this.messageCNI = "CNI doit commencer par 1 ou 2"
  return false;
}
matchValues(): (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value <= new Date()
      ? null
      : { isMatching: false };
  };
}
get f() {
  return this.informationsForm.controls;
}

getFormeJuridiques(){
  this.formeJuridiqueService.getAllFormeJuridique()
  .subscribe((res:FormeJuridique[])=>{
    if(res.length){
      this.formeJuridiques = res;
    }
  })
}

getCentreFiscals(){
  this.centreDesServicesFiscauxService.getAllCentreDesServicesFiscaux()
  .subscribe((res:CentreDesServicesFiscaux[])=>{
    if(res.length){
      this.centreFiscals = res;
    }
  })
}

prevPage() {

  this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);
}

onSubmit() {
  this.submit = true;
 
  let telephonePME = this.informationsForm.get('telephonePME').value.internationalNumber;
  this.informationsForm.get('telephonePME').setValue(telephonePME);

  Swal.fire({
    title: 'Les informations de la PME seront mises à jour. Voulez vous continuer?',
    showDenyButton: true,
    confirmButtonText: 'Oui',
    denyButtonText: `Non`,
    confirmButtonColor: '#99CC33FF',
    denyButtonColor: '#981639FF',
    cancelButtonColor: '#333366FF',
    customClass: {
      actions: 'my-actions',
      denyButton: 'order-1 right-gap',
      confirmButton: 'order-2',
    }

  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.majPME()
    //  this.router.navigate(['workstation/pme/demandes_en_cours'])

       setTimeout(() => {
         location.reload()
       }, 1000);
    } else if (result.isDenied) {
      Swal.fire('Traitement de la mise a jour non effective!', '', 'info')
    }
  })
  //fermer la boite de dialogue
  this.demandeAdhesionService.setDialog(false)

}



majPME() {  
  let body = {
    idPME: this.pme.idPME,
   
    ...this.informationsForm.value
  }
  this.pmeService.updatePme(body).subscribe((result) => { 
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La mise a jour a bien été effectuée .</p><br><p style='font-size: large;font-weight: bold;'></p>",
          color: "#203359",
          confirmButtonColor: "#99CC33",
          confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
          allowOutsideClick: false
        })

      }
  this.tokenStorage.savePME(result)
      
  })
}


}