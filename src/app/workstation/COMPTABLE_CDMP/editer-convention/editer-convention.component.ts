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
  text2:TextConvention=new TextConvention();
  constructor(
    private router : Router,
    private ref: DynamicDialogRef, private pmeService: PmeService
    ,private conventionService : ConventionService, private config: DynamicDialogConfig,
    private tokenStorage:TokenStorageService,
    private observationService:ObservationService
  ) {     
    
  }
  

  ngOnInit(): void {
    this.dateEdit = new Date();
   this.demande = this.config.data.demande;
   if(this.demande.conventions.length){
    this.decode = this.demande.conventions[0].valeurDecoteByDG*this.demande.bonEngagement.montantCreance;
    this.getTextConvention(this.demande.conventions[0].idConvention);
    this.getObervation();
    this.convention = {      
      idDemande:this.demande.idDemande,
      idConvention: this.demande.conventions[0].idConvention
    }
   }else{
    this.text = new TextConvention("valorisation des contreparties","contribuer au financement du projet",
    "l’intégralité de la contribution", "les documents écrits relatifs au projet",
     "réclamation ou revendication", "5 % du montant");
     //this.text2 =this.text;
    this.convention = {
      idDemande:this.demande.idDemande,
      pme:{
        idPME:this.demande.pme.idPME
    }
    }
    
   }
  }

getObervation(){
  this.observationService.getObservationByDemandeCessionANDStatut(this.demande.idDemande, this.demande.statut.libelle)
  .subscribe((res:Observation) =>{
    this.motifRejet = res.libelle;
  })
}

getTextConvention(id){
  this.conventionService.getTextConvention(id)
  .subscribe((res:TextConvention) =>{
    this.text = res;
  })
}


onNameChangeVar1(val) {
  this.text2.var1 =val;
  }
onNameChangeVar2(val) {
  this.text2.var2 =val;
}
onNameChangeVar3(val) {
  this.text2.var3 =val;
}
onNameChangeVar4(val) {
  this.text2.var4 =val;
}
onNameChangeVar5(val) {
  this.text2.var5 =val;
}

onNameChangeVar6(val) {
  this.text2.var6 =val;
}


  //envoie du formulaire
  onSubmit() {

    this.ref.close();
    Swal.fire({
      title: 'Voulez-vous enregistrer la convention?',
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

  getData(){
    if(this.text2.var1 ==null ){
      this.text2.var1 = this.text.var1;
    }
    if(this.text2.var2 ==null ){
      this.text2.var2 = this.text.var2;
    }
    if(this.text2.var3 ==null ){
      this.text2.var3 = this.text.var3;
    }
    if(this.text2.var4 ==null ){
      this.text2.var4 = this.text.var4;
    }
    if(this.text2.var6 ==null ){
      this.text2.var6 = this.text.var6;
    }
    if(this.text2.var5 ==null ){
      this.text2.var5 = this.text.var5;
    }
  }

  //enregistrement du document avec l'appel du service d'enregistrement
  enregistrerConvention() { 
    this.getData()
    this.text2.id = this.text?.id;
    this.convention.textConventionDto = this.text2;
    if(this.demande.conventions[0] !=null){
      this.conventionService.corrigerConvention(this.convention)
      .subscribe((response: any) =>  {
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut={}      
        this.observation.demandeid = this.demande.idDemande;
      this.observation.statut.libelle =StatutEnum.conventionCorrigee;
      this.observationService.postObservation(this.observation).subscribe(data => data)
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
        error   }
      )
    }
   else{
    this.conventionService.postConvention(this.convention)
    .subscribe((response: any) =>  {
      this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
      this.observation.statut={}      
      this.observation.demandeid = this.demande.idDemande;
    this.observation.statut.libelle =StatutEnum.conventionGeneree;
    this.observationService.postObservation(this.observation).subscribe(data => data)
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
      error
      }
    )
   }
  }

  dismiss() {
    this.ref.close();
  }


}


