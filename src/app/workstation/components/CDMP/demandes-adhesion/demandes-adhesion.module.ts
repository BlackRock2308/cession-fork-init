import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeAdhesionComponent } from '../../PME/demande-adhesion/demande-adhesion.component';
import { RouterModule } from '@angular/router';
import { VerificationComponent } from '../verification/verification.component';
import { InformationsNineaComponent } from '../informations-ninea/informations-ninea.component';
import { DemandesAdhesionComponent } from './demandes-adhesion.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component: DemandesAdhesionComponent, 
      children:[
      {path:'', redirectTo: 'steps/verification', pathMatch: 'full'},
      //étape de vérification
      {path:'steps/verification',component:VerificationComponent},
      //étape de rensignement des informations du ninea
      {path:'steps/informations_ninea',component:InformationsNineaComponent},
      ]}
  ])
  ]
})
export class DemandesAdhesionModule { }

 