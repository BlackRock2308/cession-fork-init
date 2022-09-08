import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFooterComponent } from './core/app-layout/footer/app.footer.component';
import { AppBreadcrumbComponent } from './core/breadcrumb/app.breadcrumb.component';
// PrimeNG Components for demos
import {FullCalendarModule} from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';
// Application Components
import {AppComponent} from './app.component';
import {AppLoginComponent} from './auth/login/app.login.component';

// Demo pages

//modal dynamique avec primeng
import {DynamicDialogModule} from 'primeng/dynamicdialog';


// Application services
import {BreadcrumbService} from './core/breadcrumb/breadcrumb.service';
import {MenuService} from './core/app-layout/side-menu/app.menu.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CoreModule} from './core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeComponent} from './home/home.component';
import { MajMdpComponent } from './auth/maj-mdp/maj-mdp.component';
import { RecupMdpComponent } from './auth/recup-mdp/recup-mdp.component';
import { CodeVerificationComponent } from './auth/recup-mdp/code-verification/code-verification.component';
import { AdhesionComponent } from './PME/adhesion/adhesion.component';
import { DemandesAdhesionComponent } from './CDMP/demandes-adhesion/demandes-adhesion.component';
import { MessageService } from 'primeng/api';
import { MenuComponent } from './PME/menu/menu.component';
import { VerificationComponent } from './CDMP/demandes-adhesion/adhesion-process/verification/verification.component';
import { InformationsComplementaireComponent } from './CDMP/demandes-adhesion/adhesion-process/informations-complementaire/informations-complementaire.component';
import { NouvelleDemandeComponent } from './PME/nouvelle-demande/nouvelle-demande.component';
import { AppRightPanelComponent } from './core/app-layout/right-panel/app.rightpanel.component';
import { AppTopBarComponent } from './core/app-layout/top-bar/app.topbar.component';
import { AppMenuComponent } from './core/app-layout/side-menu/app.menu.component';
import { SideBarComponent } from './PME/side-bar/side-bar.component';
import { DemandeAdhesionComponent } from './PME/demande-adhesion/demande-adhesion.component';
import { NavbarComponent } from './PME/navbar/navbar.component';
import { MenuCdmpComponent } from './CDMP/menu-cdmp/menu-cdmp.component';
import { AnalyseRisqueComponent } from './CDMP/analyse-risque/analyse-risque.component';

import { ComplementDocumentsComponent } from './CDMP/complement_documents/complement_documents.component';
FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
]);

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/translations/', '.json');
}
@NgModule({
    imports: [
        CoreModule,
        RouterModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule ,
        DynamicDialogModule

    ],
    declarations: [
        AppComponent,
        AppLoginComponent,
        HomeComponent,
        MajMdpComponent,
        RecupMdpComponent,
        CodeVerificationComponent,
        AdhesionComponent,
        DemandesAdhesionComponent,
        VerificationComponent,
        InformationsComplementaireComponent,
        DemandeAdhesionComponent,
        MenuComponent,
        NouvelleDemandeComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        SideBarComponent,
        NavbarComponent,
        MenuCdmpComponent,
        AnalyseRisqueComponent,
        ComplementDocumentsComponent
        
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
         MenuService, BreadcrumbService,MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
