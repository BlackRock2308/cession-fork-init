import { NgModule } from '@angular/core';

import { WorkstationRoutingModule } from './workstation-routing.module';
import { MenuCdmpComponent } from './components/CDMP/menu-cdmp/menu-cdmp.component';
import { MenuComponent } from './components/PME/menu/menu.component';
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
import { ListPaiementCdmpComponent } from './COMPTABLE_CDMP/list-paiement-cdmp/list-paiement-cdmp.component';
import { PaiementPMEComponent } from './COMPTABLE_CDMP/paiement-pme/paiement-pme.component';
import { ListPaiementPMEComponent } from './COMPTABLE_CDMP/list-paiement-pme/list-paiement-pme.component';
import { PaiementCDMPComponent } from './COMPTABLE_CDMP/paiement-cdmp/paiement-cdmp.component';
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


@NgModule({
  declarations: [
    MenuCdmpComponent,
    MenuComponent,
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
    PaiementPMEComponent,
    ListPaiementPMEComponent,
    PaiementCDMPComponent,
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
    ListPaiementsDetailsComponent
    
  ],
  imports: [
    CoreModule,
    WorkstationRoutingModule,
    CardModule,
    TableModule,
    PdfViewerModule,
    ChartModule
  ],
  exports: [
    RouterModule,
    NouvelleDemandeComponent,
      
  ],
  entryComponents: [
    VisualiserDocumentComponent,
    PaiementPMEComponent,
    PaiementCDMPComponent,
    ConventionSignerComponent
     
],
providers: [
  NgbActiveModal,
  AppConfigService
]
})
export class WorkstationModule { }
