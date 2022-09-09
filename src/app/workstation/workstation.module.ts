import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@NgModule({
  declarations: [
    MenuCdmpComponent,
    MenuComponent,
    NouvelleDemandeComponent,
    DemandesAdhesionComponent,
    DemandeAdhesionComponent,
    AdhesionComponent,
    AnalyseRisqueComponent
    
  ],
  imports: [
    CoreModule,
    WorkstationRoutingModule
  ],
  exports: [
    RouterModule,
    CoreModule,
    NouvelleDemandeComponent
    
      
  ]
})
export class WorkstationModule { }
