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
    DemandesCessionComponent

    
  ],
  imports: [
    CoreModule,
    WorkstationRoutingModule,
    CardModule,
    TableModule,
    PdfViewerModule
  ],
  exports: [
    RouterModule,
    //CoreModule,
    NouvelleDemandeComponent,
      
  ],
  entryComponents: [
    VisualiserDocumentComponent
     
],
providers: [
  NgbActiveModal
]
})
export class WorkstationModule { }
