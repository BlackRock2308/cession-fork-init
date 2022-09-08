import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppMainComponent} from './core/app-layout/main/app.main.component';
import {AppNotfoundComponent} from './core/not-found/app.notfound.component';
import {AppErrorComponent} from './core/error/app.error.component';
import {AppAccessdeniedComponent} from './core/access-denied/app.accessdenied.component';
import {AppLoginComponent} from './auth/login/app.login.component';
import {TestComponent} from './core/generic-component/test/test.component';
import {HomeComponent} from './home/home.component';
import { AdhesionComponent } from './PME/adhesion/adhesion.component';
import { DemandesAdhesionComponent } from './CDMP/demandes-adhesion/demandes-adhesion.component';
import { MajMdpComponent } from './auth/maj-mdp/maj-mdp.component';
import { RecupMdpComponent } from './auth/recup-mdp/recup-mdp.component';
import { CodeVerificationComponent } from './auth/recup-mdp/code-verification/code-verification.component';
import { MenuComponent } from './PME/menu/menu.component';
import { NouvelleDemandeComponent } from './PME/nouvelle-demande/nouvelle-demande.component';
import { DemandeAdhesionComponent } from './PME/demande-adhesion/demande-adhesion.component';
import { MenuCdmpComponent } from './CDMP/menu-cdmp/menu-cdmp.component';
import { AnalyseRisqueComponent } from './CDMP/analyse-risque/analyse-risque.component';
import { ComplementDocumentsComponent } from './CDMP/complement_documents/complement_documents.component';


const routes: Routes = [
    // Root Path
    {
        path: '', component: AppMainComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            
            
            // Workstation
            {
                path: '',
                loadChildren: () => import('./workstation/workstation.module')
                    .then(m => m.WorkstationModule)
            },
        ]

    },

    //Menu de la CDMP
    {path: 'cdmp/menu', component: MenuCdmpComponent,
children: [
        {path:'demandes',loadChildren: () => import('./CDMP/demandes-adhesion/adhesion-process/adhesion-process.module').then(m => m.AdhesionProcessModule)},
      ]},

    //Demandes adhesion pour la CDMP
    {path: 'cdmp/demandes', component: DemandesAdhesionComponent},

    //Analyse du risque pour la CDMP
    {path: 'cdmp/analyse_risque', component: AnalyseRisqueComponent},

    //Nouvelle demande PME
    {path: 'pme/new_demande', component: NouvelleDemandeComponent},

    //Demandes en cours de la PME
    {path: 'pme/demandes_en_cours', component: DemandeAdhesionComponent},
    // Testing...
    {path: 'test', component: TestComponent},

    // Auth path
    {path: 'login/maj_pwd', component: MajMdpComponent},



     // Menu-pme
     {path: 'menu', 
     component: MenuComponent},

    //Adhesion path
    {path:'adh',component:AdhesionComponent},

    //Demandes d'adhesion path
    //{path:'demandes',loadChildren: () => import('./CDMP/demandes-adhesion/adhesion-process/adhesion-process.module').then(m => m.AdhesionProcessModule)},

    //Identification budgétaire
    {path: 'identification_budgetaire', component: ComplementDocumentsComponent},
    //Recuperation mot de passe
    {path: 'login/recup_pwd', component: RecupMdpComponent},
    {path: 'login/recup_pwd/code_checking', component: CodeVerificationComponent},
    //Mise a jour mot de passe
    {path: 'login', component: AppLoginComponent},
    // Error Handling
    {path: '404', component: AppNotfoundComponent},
    {path: '**', redirectTo: '/notfound'},
    {path: 'error', component: AppErrorComponent},
    {path: 'accessdenied', component: AppAccessdeniedComponent},


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
