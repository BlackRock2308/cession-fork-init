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
import { VerificationComponent } from './components/CDMP/verification/verification.component';
import { InformationsNineaComponent } from './components/CDMP/informations-ninea/informations-ninea.component';


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
    VerificationComponent,
    InformationsNineaComponent
    
  ],
  imports: [
    CoreModule,
    WorkstationRoutingModule
  ],
  exports: [
    RouterModule,
    //CoreModule,
    NouvelleDemandeComponent
    
      
  ]
})
export class WorkstationModule { }
