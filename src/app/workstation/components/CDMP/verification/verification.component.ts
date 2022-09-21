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

  pas_existant:boolean=false;

  active:boolean;

  pas_active:boolean=false;
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
  
      handle1Change(e){
        this.pas_existant=false
       
      }
      handle2Change(e){
        this.existant=false
      }

      handle3Change(e){
        this.pas_active=false
       
      }
      handle4Change(e){
        this.active=false
      }
  onSubmit(){
      this.verifierDemandeAdhesion();


    }
  
  
  verifierDemandeAdhesion() {
    this.demande.nineaValide=this.existant
    this.demandeAdhesionService.patchBasicInformation(this.id,{"nineaValide":this.demande.nineaValide}).subscribe()

  }
}
