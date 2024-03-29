import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AppBreadcrumbComponent } from '../core/breadcrumb/app.breadcrumb.component';
import { ListCentreDesServicesFiscauxComponent } from './components/ADMIN/centreDesServicesFiscaux/list-centreDesServicesFiscaux/list-centreDesServicesFiscaux.component';
import { ListFormeJuridiqueComponent } from './components/ADMIN/formeJuridique/list-formeJuridique/list-formeJuridiques.component';
import { ListMinistereDepensierComponent } from './components/ADMIN/ministereDepensier/list-ministereDepensier/list-ministereDepensiers.component';
import { ListParametrageDecoteComponent } from './components/ADMIN/parametreDecote/list-parametreDecote/list-parametreDecote.component';
import { ListUtilisateurComponent } from './components/ADMIN/utilisateurs/list-utilisateurs/list-utlisateur.component';
import { AnalyseRisqueComponent } from './components/CDMP/analyse-risque/analyse-risque.component';
import { ConsulterDemandeComponent } from './components/CDMP/consulter-demande/consulter-demande.component';
import { DashboardDGComponent } from './components/CDMP/dashboard-dg/dashboard-dg.component';
import { DemandesAdhesionComponent } from './components/CDMP/demandes-adhesion/demandes-adhesion.component';
import { DemandesCessionComponent } from './components/CDMP/demandes-cession/demandes-cession.component';
import { InformationsNineaComponent } from './components/CDMP/informations-ninea/informations-ninea.component';
import { RecevabiliteComponent } from './components/CDMP/recevabilite/recevabilite/recevabilite.component';
import { TacheAnalyseComponent } from './components/CDMP/tache-analyse/tache-analyse.component';
import { VerifierDemandeCessionComponent } from './components/CDMP/verifierDemandeCession/verifier-demande-cession/verifier-demande-cession.component';
import { VisualiserDemandesComponent } from './components/CDMP/visualiser-demandes/visualiser-demandes.component';
import { DetailsConventionComponent } from './components/Ordonnateur/convention_de_cession/details-convention/details-convention.component';
import { ListeConventionsComponent } from './components/Ordonnateur/convention_de_cession/liste-conventions/liste-conventions/liste-conventions.component';
import { AdhesionComponent } from './components/PME/adhesion/adhesion.component';
import { ComplementDocumentsComponent } from './components/PME/complement_documents/complement_documents.component';
import { ConventionCessionPMEComponent } from './components/PME/convention-cession/convention-cession.component';
import { DemandeAdhesionComponent } from './components/PME/demande-adhesion/demande-adhesion.component';
import { InfosPMEComponent } from './components/PME/infos-pme/infos-pme.component';
import { ListPaiementsComponent } from './components/PME/list-paiements/list-paiements.component';
import { NouvelleDemandeComponent } from './components/PME/nouvelle-demande/nouvelle-demande.component';
import { PaiementsComponent } from './components/PME/paiements/paiements.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ConventionCessionComponent } from './COMPTABLE_CDMP/convention-cession/convention-cession.component';
import { ConventionSignerComponent } from './COMPTABLE_CDMP/convention-signer/convention-signer.component';
import { ListPaiementCdmpComponent } from './COMPTABLE_CDMP/list-detail-paiement-cdmp/list-detail-paiement-cdmp.component';
import { ListPaiementPMEComponent } from './COMPTABLE_CDMP/list-detail-paiement-pme/list-detail-paiement-pme.component';
import { PaimentsComponent } from './COMPTABLE_CDMP/paiments/paiements.component';
import {SearchFilterComponent} from './components/generic/search-filter/search-filter.component'

const routes: Routes = [

  //CDMP
  {path: 'cdmp/analyse_risque', component: AnalyseRisqueComponent},
  //Liste des demandes de toutes les PME
  {path: 'cdmp/demandes_en_cours', loadChildren: () => import('./components/CDMP/demandes-adhesion/demandes-adhesion.module').then(m => m.DemandesAdhesionModule)},
  //{path: 'cdmp/demandes_en_cours', component: DemandesAdhesionComponent},

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
  {path:'comptable/list-paiements-cdmp/:idPaiement' , component:ListPaiementCdmpComponent},
  {path:'comptable/list-paiements-pme/:idPaiement' , component:ListPaiementPMEComponent},
  {path:'comptable/signer' , component:ConventionSignerComponent},

  //PME
  {path:'pme/infosPME',component:InfosPMEComponent},
  //Liste des demandes de la PME
  {path: 'pme/demandes_en_cours', component: DemandeAdhesionComponent},

  {path: 'pme/convention', component: DemandesCessionComponent},
  //Page d'accueil de la PME
  {path: 'pme/new_demande', component: NouvelleDemandeComponent},
  //Compléments documents
  {path:'pme/demandes_en_cours/complement_documents',component:ComplementDocumentsComponent},
  //Paiements et Recouvrement de la PME
  {path:'pme/paiements',component:PaiementsComponent},
  {path:'pme/list-paiements/:idPaiement',component:ListPaiementsComponent},

  {path:'profil',component:ProfilComponent},

  //convention cession
  {path:'pme/convention_cession',component:ConventionCessionPMEComponent},

  //DG

  {path:'ordonnateur/conventions',component:ListeConventionsComponent},
  {path:'ordonnateur/conventions/details_convention',component:DetailsConventionComponent},

  //admin
  {path: 'admin/ministere_depensier', component:ListMinistereDepensierComponent},
  {path: 'admin/forme_juridique', component:ListFormeJuridiqueComponent},  
  {path: 'admin/centre_des_servicesFiscaux', component:ListCentreDesServicesFiscauxComponent},
  {path: 'admin/parametrages_decotes', component:ListParametrageDecoteComponent},  
  {path: 'admin/utilisateurs', component:ListUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkstationRoutingModule { }
