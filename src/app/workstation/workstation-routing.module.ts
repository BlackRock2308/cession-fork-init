import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyseRisqueComponent } from './components/CDMP/analyse-risque/analyse-risque.component';
import { ConsulterDemandeComponent } from './components/CDMP/consulter-demande/consulter-demande.component';
import { DemandesAdhesionComponent } from './components/CDMP/demandes-adhesion/demandes-adhesion.component';
import { MenuCdmpComponent } from './components/CDMP/menu-cdmp/menu-cdmp.component';
import { TacheAnalyseComponent } from './components/CDMP/tache-analyse/tache-analyse.component';
import { VisualiserDemandesComponent } from './components/CDMP/visualiser-demandes/visualiser-demandes.component';
import { AdhesionComponent } from './components/PME/adhesion/adhesion.component';
import { ComplementDocumentsComponent } from './components/PME/complement_documents/complement_documents.component';
import { DemandeAdhesionComponent } from './components/PME/demande-adhesion/demande-adhesion.component';
import { MenuComponent } from './components/PME/menu/menu.component';
import { NouvelleDemandeComponent } from './components/PME/nouvelle-demande/nouvelle-demande.component';


const routes: Routes = [

 

  //CDMP
  {path: 'cdmp/analyse_risque', component: AnalyseRisqueComponent},
  //Liste des demandes de toutes les PME
  {path: 'cdmp/demandes_en_cours', component: DemandesAdhesionComponent},
  //Page d'accueil de la CDMP
  {path: 'cdmp/accueil', component: MenuCdmpComponent},

  {path:'cdmp/analyser' , component:TacheAnalyseComponent},
  {path: 'cdmp/visualiser-demandes', component: VisualiserDemandesComponent},

  //Consulter une demande de cession a l'etat risque ou non risquee
  {path:'cdmp/consulter_demande' , component:ConsulterDemandeComponent},

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
