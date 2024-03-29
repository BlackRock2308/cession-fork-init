import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppMainComponent } from './core/app-layout/main/app.main.component';
import { AppNotfoundComponent } from './core/not-found/app.notfound.component';
import { AppErrorComponent } from './core/error/app.error.component';
import { AppAccessdeniedComponent } from './core/access-denied/app.accessdenied.component';
import { AppLoginComponent } from './auth/login/app.login.component';
import { MajMdpComponent } from './auth/maj-mdp/maj-mdp.component';
import { RecupMdpComponent } from './auth/recup-mdp/recup-mdp.component';
import { CodeVerificationComponent } from './auth/recup-mdp/code-verification/code-verification.component';


import { AdhesionComponent } from './workstation/components/PME/adhesion/adhesion.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
    // Root Path
    {
        path: '', component: AppLoginComponent
    },
    {
        path: 'workstation', component: AppMainComponent,
        children: [
            {path: '', redirectTo: 'pme/demandes_en_cours', pathMatch: 'full'},
            {
                path: '',
                loadChildren: () => import('./workstation/workstation.module').then(m => m.WorkstationModule),
            },
        ]
        ,canActivate: [AuthGuard]},
    //{ path: '**', redirectTo: 'login' },

    { path: 'pme/adhesion', component: AdhesionComponent},


    // Auth path
    { path: 'login/maj_pwd', component: MajMdpComponent },

    //Demandes d'adhesion path
    // {path:'demandes',loadChildren: () => import('./workstation/components/CDMP/demandes-adhesion/adhesion-process/adhesion-process.module').then(m => m.AdhesionProcessModule)},

    //Recuperation mot de passe
    { path: 'login/recup_pwd', component: RecupMdpComponent },
    { path: 'login/recup_pwd/code_checking', component: CodeVerificationComponent },
    //Mise a jour mot de passe
    { path: 'login', component: AppLoginComponent },
    // Error Handling
    { path: 'denied', component: AppAccessdeniedComponent },
    { path: '404', component: AppNotfoundComponent },
    { path: 'error', component: AppErrorComponent },
    { path: '**', redirectTo: '/login' },
    


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
