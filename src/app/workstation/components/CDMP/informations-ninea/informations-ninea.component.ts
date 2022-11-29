import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Observation } from 'src/app/workstation/model/observation';
import { PME } from 'src/app/workstation/model/pme';
import { SearchCountryField,  CountryISO } from 'ngx-intl-tel-input';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { UtilisateurService } from 'src/app/workstation/service/utilisateur/utilisateur.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-informations-ninea',
  templateUrl: './informations-ninea.component.html',
  styleUrls: ['./informations-ninea.component.scss']
})
export class InformationsNineaComponent implements OnInit {
  dateTime = new Date();
  validPattern = "^[a-zA-Z0-9]$"
 
  informationsForm: any;
  demande: any;
  pme : PME;
  idPme:number;
  observation:Observation={};
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	//TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  submit: boolean = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private demandeAdhesionService: DemandesAdhesionService,
    private pmeService: PmeService,
    private utilisateurService : UtilisateurService,
    private observationService:ObservationService,
    private tokenStorage:TokenStorageService
  
  ) { }

  ngOnInit(): void {

    this.informationsForm = this.formBuilder.group({
      raisonSocial: ['' , [Validators.required]],
      formeJuridique: ['' , [Validators.required]],
      centreFiscal: ['' , [Validators.required]],
      adressePME: ['' , [Validators.required]],
      enseigne: ['' , [Validators.required]],
      localite: ['' , [Validators.required]],
      controle: ['' , [Validators.required]],
      activitePrincipale: ['', [Validators.required]],
      registre: ['' , [Validators.required]],
      prenomRepresentant: ['' , [Validators.required]],
      nomRepresentant: ['' , [Validators.required]],
      dateCreation: ['' , [Validators.required,  this.matchValues()]],
      effectifPermanent: ['' , [Validators.required]],
      nombreEtablissementSecondaires: ['' , [Validators.required]],
      chiffresDaffaires: ['' , [Validators.required]],
      cniRepresentant: ['' , [Validators.required] , Validators.pattern(this.validPattern)],
      dateImmatriculation: ['' , [Validators.required, this.matchValues()]],
      telephonePME: ['' , [Validators.required]],
      capitalsocial : ['' , [Validators.required]],
      autorisationMinisterielle : ['' , [Validators.required]]
    });

    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme=this.demande.pme

    })
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

  prevPage() {

    this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/verification']);
  }

  onSubmit() {
    this.submit = true;
    if (this.informationsForm.invalid) {
      return;
    }
    let telephonePME = this.informationsForm.get('telephonePME').value.internationalNumber;
    this.informationsForm.get('telephonePME').setValue(telephonePME);
    
    Swal.fire({
      title: 'La demande d\'adhésion sera validée et les informations de la pme mise à jour.Voulez vous continuer?',
      showDenyButton: true,
      confirmButtonText: 'Continuer',
      denyButtonText: `Annuler`,
      confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF'

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.enregistrerInfos()
        this.demandeAdhesionService.setDialog(false)
        setTimeout(() => {
          location.reload()
       },100);
      } else if (result.isDenied) {
        Swal.fire('Traitement de la demande non effective!', '', 'info')
      }
    })

    

    //fermer la boite de dialogue
    this.demandeAdhesionService.setDialog(false)

  }

  async patchPme (){
    let body2 = {
      hasninea : this.demande.hasninea,
      isactive : this.demande.isactive
    }
    let body={
      ...this.informationsForm.value , ...body2
     }

     console.log(JSON.stringify(body))
     await this.pmeService.patchPme(this.pme.idPME,body).subscribe((result)=>{
      console.log(result)
      })
   
      
    }


    //A integrer apres le deploiement du microservice de notification
    async createCompte(){
       let infoEmail = {
        email : this.pme.email
       }
     console.log(infoEmail)
       this.utilisateurService.createCompte(infoEmail).subscribe((result)=>{
         console.log(result)
         })
     }
  
 

   enregistrerInfos() {
   
   this.validerDemandeAdhesion();

    console.log(this.pme)
  }

  
  async validerDemandeAdhesion() {

  
      await this.patchPme()
      console.log(this.pme.idPME)
      await this.demandeAdhesionService.validerAdhesion(this.demande.idDemande).subscribe(
       (result)=>{
         console.log(result)
        },
        (error)=>{},
         ()=>{
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été completée et validée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
            color: "#203359",
            confirmButtonColor: "#99CC33",
            confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
            allowOutsideClick: false
          })      
          setTimeout(() => {
           location.reload()
          }, 1500);
          }
        
     )
    await this.createCompte()
  }

}
