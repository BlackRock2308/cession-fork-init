import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicInfo, DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  existant:boolean=false;


  active:boolean=false;

  demande: any;
  id: any;

  constructor(private router: Router,private demandeAdhesionService:DemandesAdhesionService) { }

  ngOnInit(): void {
   this.demandeAdhesionService.getDemandeObs().subscribe(data=>{
    this.demande=data
    this.id=data.id})
    }

    nextPage() {
      this.demande.pmeActive=this.active
      this.demande.nineaValide=this.existant
      console.log(this.demande)
      this.demandeAdhesionService.setDemandeObs(this.demande)
      this.router.navigate(['workstation/cdmp/demandes_en_cours/steps/informations_ninea']);
      }
  
      
  onSubmit(){
      this.demande.nineaValide=this.existant
      //this.demande.pmeActive=this.active

      let body={
        nineaValide:this.demande.nineaValide,
        //pmeActive:this.demande.pmeActive
      }
      this.verifierDemandeAdhesion(body);

       //fermer la boite de dialogue
      this.demandeAdhesionService.setDialog(false)

      //
      this.router.navigate(['workstation/cdmp/demandes_en_cours/']);


    }
  
  
  verifierDemandeAdhesion(body:any) {
    
    this.demandeAdhesionService.patchBasicInformation(this.id,body).subscribe(data=>{
      console.log(this.demande,data)
    })

  }
}
