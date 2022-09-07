import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandesAdhesionComponent } from '../demandes-adhesion.component';
import { RouterModule } from '@angular/router';
import { VerificationComponent } from './verification/verification.component';
import { InformationsComplementaireComponent } from './informations-complementaire/informations-complementaire.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component: DemandesAdhesionComponent, children:[
      {path:'', redirectTo: 'verification', pathMatch: 'full'},
      {path: 'verification', component: VerificationComponent},
      {path: 'informations_complementaire', component: InformationsComplementaireComponent},
      
      ]}
  ])
  ],
  exports: [RouterModule]
})
export class AdhesionProcessModule { }
