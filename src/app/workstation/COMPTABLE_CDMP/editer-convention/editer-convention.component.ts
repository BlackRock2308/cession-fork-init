import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import Swal from 'sweetalert2';
import { Observation } from '../../model/observation';
import { StatutEnum } from '../../model/statut-enum';
import { TextConvention } from '../../model/TextConvention';
import { ConventionService } from '../../service/convention/convention.service';
import { ObservationService } from '../../service/observation/observation.service';

@Component({
  selector: 'app-editer-convention',
  templateUrl: './editer-convention.component.html',
  styleUrls: ['./editer-convention.component.scss']
})
export class EditerConventionComponent implements OnInit {


  dateEdit:Date;
  typesDocument: any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  demande: any;
  observation:Observation={}
  remarqueJuriste:string;
  decode:number;
  convention:any =null;
  motifRejet:String;
  text:TextConvention = null;
  constructor(
    private router : Router,
    private ref: DynamicDialogRef, private pmeService: PmeService
    ,private conventionService : ConventionService, private config: DynamicDialogConfig,
    private tokenStorage:TokenStorageService,
    private observationService:ObservationService
  ) {     
    this.text = new TextConvention("valorisation des contreparties","contribuer au financement du projet",
    "l’intégralité de la contribution", "les documents écrits relatifs au projet",
     "réclamation ou revendication", "5 % du montant");
  }
  

  ngOnInit(): void {
    this.dateEdit = new Date();
   this.demande = this.config.data.demande;
   if(this.demande.conventions.length){
    document.getElementById("texteJuridique").innerHTML = this.convention.remarqueJuriste;
    this.getObervation();
    this.convention = {      
      idDemande:this.demande.idDemande,
      idConvention: this.demande.conventions[0].idConvention
    }
    this.text =this.demande.conventions[0].textConventionDto;
   }else{
    this.convention = {
      idDemande:this.demande.idDemande,
      pme:{
        idPME:this.demande.pme.idPME
    }
    }
    
   }
  }

getObervation(){
  this.observationService.getObservationByDemandeCessionANDStatut(this.demande.idDemande, this.demande.statut.code)
  .subscribe((res:Observation) =>{
    this.motifRejet = res.libelle;
  })
}

htmlToText(val:string){
  val = val.replace('&nbsp;',' ');
  val = val.replace('</div>', ' ');
  val = val.replace('<div>', '\n')
  return val;
}
onNameChangeVar1(val) {
 this.text.var1 =val;
 this.text.var1 = this.htmlToText(this.text.var1);
}
onNameChangeVar2(val) {
  this.text.var2 =val;
  this.text.var2 = this.htmlToText(this.text.var2);
}
onNameChangeVar3(val) {
  this.text.var3 =val;
  this.text.var3 = this.htmlToText(this.text.var3);
}
onNameChangeVar4(val) {
  this.text.var4 =val;
  this.text.var4 = this.htmlToText(this.text.var4);
}
onNameChangeVar5(val) {
  this.text.var5 =val;
  this.text.var5 = this.htmlToText(this.text.var5);
}

onNameChangeVar6(val) {
  this.text.var6 =val;
  this.text.var6 = this.htmlToText(this.text.var6);
}


  //envoie du formulaire
  onSubmit() {

    this.ref.close();

    // arrêter si le formulaire est invalide
    // if (this.documentForm.invalid) {
    //   return;
    // }

    Swal.fire({
      title: 'Voulez-vous enregistrer la convention',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Annuler`,
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
        this.enregistrerConvention();
      }
      else if (result.isDenied) {
        Swal.fire('Enregistrement annulée', '', 'info')
      }
    })
  }
  patchDemandeStatut(id: number, statut: any) {
    this.pmeService.patchStatutDemande(id, statut).subscribe()
  }

  //enregistrement du document avec l'appel du service d'enregistrement
  enregistrerConvention() { 
    this.convention.textConventionDto = this.text;
    if(this.demande.conventions[0] !=null){
      this.conventionService.corrigerConvention(this.convention)
      .subscribe((response: any) =>  {
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut={}      
        this.observation.demandeid = this.demande.idDemande;
      this.observation.statut.libelle =StatutEnum.conventionCorrigee;
      this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
      Swal.fire({

        html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a été corrigée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
        color:"#203359",
        icon:'success',
        confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
        allowOutsideClick:false,
        showConfirmButton:false
        
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['workstation/comptable/convention_cession'])
        }})
        setTimeout(() => {
          location.reload()
         }, 1500);
     
  
      },
      (error) => {
        console.log(error)      }
      )
    }
   else{
    this.conventionService.postConvention(this.convention)
    .subscribe((response: any) =>  {
      this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
      this.observation.statut={}      
      this.observation.demandeid = this.demande.idDemande;
    this.observation.statut.libelle =StatutEnum.conventionGeneree;
    this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
    Swal.fire({

      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a bien été enregistrée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color:"#203359",
      icon:'success',
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      showConfirmButton:false
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/comptable/convention_cession'])
      }})
      setTimeout(() => {
        location.reload()
       }, 1500);
   

    },
    (error) => {
      console.log(error)      }
    )
   }
  }

  dismiss() {
    this.ref.close();
  }


}


