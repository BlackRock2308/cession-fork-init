import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBreadcrumbComponent } from '../core/breadcrumb/app.breadcrumb.component';
import { AnalyseRisqueComponent } from './components/CDMP/analyse-risque/analyse-risque.component';
import { ConsulterDemandeComponent } from './components/CDMP/consulter-demande/consulter-demande.component';
import { DashboardDGComponent } from './components/CDMP/dashboard-dg/dashboard-dg.component';
import { DemandesAdhesionComponent } from './components/CDMP/demandes-adhesion/demandes-adhesion.component';
import { DemandesCessionComponent } from './components/CDMP/demandes-cession/demandes-cession.component';
import { InformationsNineaComponent } from './components/CDMP/informations-ninea/informations-ninea.component';
import { MenuCdmpComponent } from './components/CDMP/menu-cdmp/menu-cdmp.component';
import { RecevabiliteComponent } from './components/CDMP/recevabilite/recevabilite/recevabilite.component';
import { TacheAnalyseComponent } from './components/CDMP/tache-analyse/tache-analyse.component';
import { VerifierDemandeCessionComponent } from './components/CDMP/verifierDemandeCession/verifier-demande-cession/verifier-demande-cession.component';
import { VisualiserDemandesComponent } from './components/CDMP/visualiser-demandes/visualiser-demandes.component';
import { DetailsConventionComponent } from './components/Ordonnateur/convention_de_cession/details-convention/details-convention.component';
import { ListeConventionsComponent } from './components/Ordonnateur/convention_de_cession/liste-conventions/liste-conventions/liste-conventions.component';
import { AdhesionComponent } from './components/PME/adhesion/adhesion.component';
import { ComplementDocumentsComponent } from './components/PME/complement_documents/complement_documents.component';
import { DemandeAdhesionComponent } from './components/PME/demande-adhesion/demande-adhesion.component';
import { ListPaiementsComponent } from './components/PME/list-paiements/list-paiements.component';
import { MenuComponent } from './components/PME/menu/menu.component';
import { NouvelleDemandeComponent } from './components/PME/nouvelle-demande/nouvelle-demande.component';
import { PaiementsComponent } from './components/PME/paiements/paiements.component';
import { ConventionCessionComponent } from './COMPTABLE_CDMP/convention-cession/convention-cession.component';
import { ListPaiementCdmpComponent } from './COMPTABLE_CDMP/list-paiement-cdmp/list-paiement-cdmp.component';
import { ListPaiementPMEComponent } from './COMPTABLE_CDMP/list-paiement-pme/list-paiement-pme.component';
import { PaimentsComponent } from './COMPTABLE_CDMP/paiments/paiements.component';


const routes: Routes = [

 

  //CDMP
  {path: 'cdmp/analyse_risque', component: AnalyseRisqueComponent},
  //Liste des demandes de toutes les PME
  {path: 'cdmp/demandes_en_cours', loadChildren: () => import('./components/CDMP/demandes-adhesion/demandes-adhesion.module').then(m => m.DemandesAdhesionModule)},
  //{path: 'cdmp/demandes_en_cours', component: DemandesAdhesionComponent},
   //Page d'accueil de la CDMP
  {path: 'cdmp/accueil', component: MenuCdmpComponent},

  {path:'cdmp/analyser' , component:TacheAnalyseComponent},
  {path: 'cdmp/visualiser-demandes', component: VisualiserDemandesComponent},
  {path: 'cdmp/dashboard', component: DashboardDGComponent},
  //Consulter une demande de cession a l'etat risque ou non risquee
  {path:'cdmp/consulter_demande' , component:ConsulterDemandeComponent},

  //liste des demandes de cession
  {path:'cdmp/recevabilite' , component:RecevabiliteComponent},

  //verifier une demande de cession
  {path:'cdmp/recevabilite/verifier' , component:VerifierDemandeCessionComponent},


 // {path:'demandes',loadChildren: () => import('./components/CDMP/demandes-adhesion/adhesion-process/adhesion-process-routing.module').then(m => m.AdhesionProcessModule)},

  //COMPTABLE CDMP
  {path:'comptable/convention_cession' , component:ConventionCessionComponent},
  {path:'comptable/paiements' , component:PaimentsComponent},
  {path:'comptable/list-paiements-cdmp' , component:ListPaiementCdmpComponent},
  {path:'comptable/list-paiements-pme' , component:ListPaiementPMEComponent},

  //PME
  
  //Liste des demandes de la PME
  {path: 'pme/demandes_en_cours', component: DemandeAdhesionComponent},

  {path: 'pme/convention', component: DemandesCessionComponent},
  //Page d'accueil de la PME
  {path: 'pme/accueil', component: MenuComponent},
  {path: 'pme/new_demande', component: NouvelleDemandeComponent},
  //Compléments documents
  {path:'pme/demandes_en_cours/complement_documents',component:ComplementDocumentsComponent},
  //Paiements et Recouvrement de la PME
  {path:'pme/paiements',component:PaiementsComponent},
  {path:'pme/list-paiements',component:ListPaiementsComponent},

  //ordonnateur

  {path:'ordonnateur/conventions',component:ListeConventionsComponent},
  {path:'ordonnateur/conventions/details_convention',component:DetailsConventionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkstationRoutingModule { }
