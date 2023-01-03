import { NgModule } from '@angular/core';
import { WorkstationRoutingModule } from './workstation-routing.module';
import { DemandesAdhesionComponent } from './components/CDMP/demandes-adhesion/demandes-adhesion.component';
import { DemandeAdhesionComponent } from './components/PME/demande-adhesion/demande-adhesion.component';
import { AdhesionComponent } from './components/PME/adhesion/adhesion.component';
import { AnalyseRisqueComponent } from './components/CDMP/analyse-risque/analyse-risque.component';
import { CoreModule } from '../core/core.module';
import { NouvelleDemandeComponent } from './components/PME/nouvelle-demande/nouvelle-demande.component';
import { RouterModule } from '@angular/router';
import { TacheAnalyseComponent } from './components/CDMP/tache-analyse/tache-analyse.component';
import { ComplementDocumentsComponent } from './components/PME/complement_documents/complement_documents.component';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import { VisualiserDemandesComponent } from './components/CDMP/visualiser-demandes/visualiser-demandes.component';
import { VisualiserDocumentComponent } from './components/CDMP/visualiser-document/visualiser-document.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsulterDemandeComponent } from './components/CDMP/consulter-demande/consulter-demande.component';
import { VerificationComponent } from './components/CDMP/verification/verification.component';
import { InformationsNineaComponent } from './components/CDMP/informations-ninea/informations-ninea.component';
import { ConventionCessionComponent } from './COMPTABLE_CDMP/convention-cession/convention-cession.component';
import { ConventionEnregistreeComponent } from './COMPTABLE_CDMP/convention-enregistree/convention-enregistree.component';
import { EditerConventionComponent } from './COMPTABLE_CDMP/editer-convention/editer-convention.component';
import { DemandesCessionComponent } from './components/CDMP/demandes-cession/demandes-cession.component';
import { PaimentsComponent } from './COMPTABLE_CDMP/paiments/paiements.component';
import { ListPaiementCdmpComponent } from './COMPTABLE_CDMP/list-detail-paiement-cdmp/list-detail-paiement-cdmp.component';
import { AddDetailsPaiementPMEComponent } from './COMPTABLE_CDMP/add-detail-paiement-pme/add-detail-paiement-pme.component';
import { ListPaiementPMEComponent } from './COMPTABLE_CDMP/list-detail-paiement-pme/list-detail-paiement-pme.component';
import { AddDetailPaiementCDMPComponent } from './COMPTABLE_CDMP/add-detail-paiement-cdmp/add-detail-paiement-cdmp.component';
import { PaiementsComponent } from './components/PME/paiements/paiements.component';
import { DashboardDGComponent } from './components/CDMP/dashboard-dg/dashboard-dg.component';
import { DetailsTableauComponent } from './components/CDMP/dashboard-dg/details-tableau/details-tableau.component';
import { ConventionSignerComponent } from './COMPTABLE_CDMP/convention-signer/convention-signer.component';
import { ListPaiementsComponent } from './components/PME/list-paiements/list-paiements.component';
import { RecevabiliteComponent } from './components/CDMP/recevabilite/recevabilite/recevabilite.component';
import { VerifierDemandeCessionComponent } from './components/CDMP/verifierDemandeCession/verifier-demande-cession/verifier-demande-cession.component';
import { AppConfigService } from './service/appconfigservice';
import { ListeConventionsComponent } from './components/Ordonnateur/convention_de_cession/liste-conventions/liste-conventions/liste-conventions.component';
import { DetailsConventionComponent } from './components/Ordonnateur/convention_de_cession/details-convention/details-convention.component';
import { ChartModule } from 'primeng/chart';
import { ListPaiementsDetailsComponent } from './components/PME/list-paiements-details/list-paiements-details.component';
import { ProfilComponent } from './components/profil/profil.component';
import {ConventionCessionPMEComponent} from './components/PME/convention-cession/convention-cession.component';
import { MessageService } from 'primeng/api';
import { CodeComponent } from './components/profil/code/code.component';
import { SignerconventionPMEComponent } from './components/PME/signer-convention/signerconvention-pme/signerconvention-pme.component';
import { CorrigerConventionComponent } from './COMPTABLE_CDMP/corrigerConvention/corriger-convention/corriger-convention.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InfosPMEComponent } from './components/PME/infos-pme/infos-pme.component';
import { AddMinistereDepensierComponent } from './components/ADMIN/ministereDepensier/add-ministereDepensier/add-ministereDepensiers.component';
import { ListMinistereDepensierComponent } from './components/ADMIN/ministereDepensier/list-ministereDepensier/list-ministereDepensiers.component';
import { UpdateMinistereDepensierComponent } from './components/ADMIN/ministereDepensier/update-ministereDepensier/update-ministereDepensiers.component';
import { AddFormeJuridiqueComponent } from './components/ADMIN/formeJuridique/add-formeJuridique/add-formeJuridique.component';
import { ListFormeJuridiqueComponent } from './components/ADMIN/formeJuridique/list-formeJuridique/list-formeJuridiques.component';
import { AddCentreDesServicesFiscauxComponent } from './components/ADMIN/centreDesServicesFiscaux/add-centreDesServicesFiscaux/add-centreDesServicesFiscaux.component';
import { ListCentreDesServicesFiscauxComponent } from './components/ADMIN/centreDesServicesFiscaux/list-centreDesServicesFiscaux/list-centreDesServicesFiscaux.component';
import { UpdateCentreDesServicesFiscauxComponent } from './components/ADMIN/centreDesServicesFiscaux/update-centreDesServicesFiscaux/update-centreDesServicesFiscaux.component';
import { UpdateFormeJuridiqueComponent } from './components/ADMIN/formeJuridique/update-formeJuridique/update-formeJuridique.component';
import { AddParametrageDecoteComponent } from './components/ADMIN/parametreDecote/add-parametreDecote/add-parametreDecote.component';
import { ListParametrageDecoteComponent } from './components/ADMIN/parametreDecote/list-parametreDecote/list-parametreDecote.component';
import { UpdateParametrageDecoteComponent } from './components/ADMIN/parametreDecote/update-parametreDecote/update-parametreDecote.component';
import { AddUtilisateurComponent } from './components/ADMIN/utilisateurs/add-utlisateurs/add-utlisateur.component';
import { ListUtilisateurComponent } from './components/ADMIN/utilisateurs/list-utilisateurs/list-utlisateur.component';
import { UpdateUtilisateurComponent } from './components/ADMIN/utilisateurs/update-utilisateurs/update-utlisateur.component';
//import { AdminComponent } from './components/ADMIN/admin/admin.component';

@NgModule({
  declarations: [
    NouvelleDemandeComponent,
    DemandesAdhesionComponent,
    DemandeAdhesionComponent,
    AdhesionComponent,
    AnalyseRisqueComponent,
    TacheAnalyseComponent,
    ComplementDocumentsComponent,
    VisualiserDemandesComponent,
    VisualiserDocumentComponent,
    ConsulterDemandeComponent,
    VerificationComponent,
    InformationsNineaComponent,
    ConventionCessionComponent,
    ConventionEnregistreeComponent,
    EditerConventionComponent,
    DemandesCessionComponent,
    PaimentsComponent,
    ListPaiementCdmpComponent,
    AddDetailPaiementCDMPComponent,
    ListPaiementPMEComponent,
    AddDetailsPaiementPMEComponent,
    PaiementsComponent,
    PaiementsComponent,
    DashboardDGComponent,
    DetailsTableauComponent,
    ConventionSignerComponent,
    ListPaiementsComponent,
    RecevabiliteComponent,
    VerifierDemandeCessionComponent,
    ListeConventionsComponent,
    DetailsConventionComponent,
    ListPaiementsDetailsComponent,
    ProfilComponent,
    ConventionCessionPMEComponent,
    CodeComponent,
    SignerconventionPMEComponent,
    CorrigerConventionComponent,
    InfosPMEComponent,
    AddMinistereDepensierComponent,
    ListMinistereDepensierComponent,
    UpdateMinistereDepensierComponent,
    AddFormeJuridiqueComponent,
    ListFormeJuridiqueComponent,
    UpdateFormeJuridiqueComponent,
    AddCentreDesServicesFiscauxComponent,
    ListCentreDesServicesFiscauxComponent,
    UpdateCentreDesServicesFiscauxComponent,
    AddParametrageDecoteComponent,
    ListParametrageDecoteComponent,
    UpdateParametrageDecoteComponent,
    AddUtilisateurComponent,
    ListUtilisateurComponent,
    UpdateUtilisateurComponent

    //AdminComponent
    
    
  ],
  imports: [
    CoreModule,
    WorkstationRoutingModule,
    CardModule,
    TableModule,
    PdfViewerModule,
    NgxIntlTelInputModule,
    ChartModule
  ],
  exports: [
    RouterModule,
    NouvelleDemandeComponent,
      
  ],
  entryComponents: [
    VisualiserDocumentComponent,
    AddDetailPaiementCDMPComponent,
    AddDetailsPaiementPMEComponent,
    ConventionSignerComponent,
    CodeComponent,
    AddDetailsPaiementPMEComponent,
    UpdateMinistereDepensierComponent,
    AddFormeJuridiqueComponent,
    UpdateMinistereDepensierComponent,
    AddCentreDesServicesFiscauxComponent,
    UpdateCentreDesServicesFiscauxComponent,
    AddParametrageDecoteComponent,
    UpdateParametrageDecoteComponent,
    AddUtilisateurComponent,
    UpdateUtilisateurComponent
     
],
providers: [
  NgbActiveModal,
  AppConfigService,
  MessageService
]
})
export class WorkstationModule { }
