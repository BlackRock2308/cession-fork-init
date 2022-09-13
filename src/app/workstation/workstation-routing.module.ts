import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyseRisqueComponent } from './components/CDMP/analyse-risque/analyse-risque.component';
import { DemandesAdhesionComponent } from './components/CDMP/demandes-adhesion/demandes-adhesion.component';
import { InformationsNineaComponent } from './components/CDMP/informations-ninea/informations-ninea.component';
import { MenuCdmpComponent } from './components/CDMP/menu-cdmp/menu-cdmp.component';
import { VerificationComponent } from './components/CDMP/verification/verification.component';
import { AdhesionComponent } from './components/PME/adhesion/adhesion.component';
import { ComplementDocumentsComponent } from './components/PME/complement_documents/complement_documents.component';
import { DemandeAdhesionComponent } from './components/PME/demande-adhesion/demande-adhesion.component';
import { MenuComponent } from './components/PME/menu/menu.component';
import { NouvelleDemandeComponent } from './components/PME/nouvelle-demande/nouvelle-demande.component';


const routes: Routes = [

 

  //CDMP
  {path: 'cdmp/analyse_risque', component: AnalyseRisqueComponent},
  //Liste des demandes de toutes les PME
  {path: 'cdmp/demandes_en_cours', loadChildren: () => import('./components/CDMP/demandes-adhesion/demandes-adhesion.module').then(m => m.DemandesAdhesionModule)},
  //{path: 'cdmp/demandes_en_cours', component: DemandesAdhesionComponent},
   //Page d'accueil de la CDMP
  {path: 'cdmp/accueil', component: MenuCdmpComponent},

 // {path:'demandes',loadChildren: () => import('./components/CDMP/demandes-adhesion/adhesion-process/adhesion-process-routing.module').then(m => m.AdhesionProcessModule)},

  //PME
  //Creation de compte de la PME
  
  //Liste des demandes de la PME
  {path: 'pme/demandes_en_cours', component: DemandeAdhesionComponent},
  //Page d'accueil de la PME
  {path: 'pme/accueil', component: MenuComponent},
  {path: 'pme/new_demande', component: NouvelleDemandeComponent},
  //Compléments documents
  {path:'pme/demandes_en_cours/complement_documents',component:ComplementDocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkstationRoutingModule { }
