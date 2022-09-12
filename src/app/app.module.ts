import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// PrimeNG Components for demos
import {FullCalendarModule} from '@fullcalendar/angular';
// Application Components
import {AppComponent} from './app.component';
import {AppLoginComponent} from './auth/login/app.login.component';

// Demo pages

//modal dynamique avec primeng
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { OverlayModule } from '@angular/cdk/overlay';

// Application services
import {BreadcrumbService} from './core/breadcrumb/breadcrumb.service';

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
import { MessageService } from 'primeng/api';
import { VisualiserDocumentComponent } from './workstation/components/CDMP/visualiser-document/visualiser-document.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MenuService } from './core/app-layout/side-menu/app.menu.service';
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
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
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
        ButtonModule,
        DynamicDialogModule,
        OverlayModule

    ],
    declarations: [
        AppComponent,
        AppLoginComponent,
        HomeComponent,
        MajMdpComponent,
        RecupMdpComponent,
        
        CodeVerificationComponent,
        
        
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
         , BreadcrumbService,MessageService,MenuService
         
    ],
    bootstrap: [AppComponent],
   
})

export class AppModule {
}
