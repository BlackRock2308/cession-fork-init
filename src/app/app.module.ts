import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG Components for demos
import { FullCalendarModule } from '@fullcalendar/angular';
// Application Components
import { AppComponent } from './app.component';
import { AppLoginComponent } from './auth/login/app.login.component';
import {ToastModule} from 'primeng/toast';
// Demo pages

//modal dynamique avec primeng
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayModule } from '@angular/cdk/overlay';

// Application services
import { BreadcrumbService } from './core/breadcrumb/breadcrumb.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CoreModule } from './core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home/home.component';
import { MajMdpComponent } from './auth/maj-mdp/maj-mdp.component';
import { RecupMdpComponent } from './auth/recup-mdp/recup-mdp.component';
import { CodeVerificationComponent } from './auth/recup-mdp/code-verification/code-verification.component';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MenuService } from './core/app-layout/side-menu/app.menu.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AuthGuard } from './auth/auth.guard';
import { AppAccessdeniedComponent } from './core/access-denied/app.accessdenied.component';
import { AppErrorComponent } from './core/error/app.error.component';
import { AppNotfoundComponent } from './core/not-found/app.notfound.component';
import { ErrorInterceptorService } from './workstation/service/gestionErreurCentralise/error-interceptor.service';
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
        HttpClientModule,
        ButtonModule,
        DynamicDialogModule,
        OverlayModule,
        BreadcrumbModule,
        NgxIntlTelInputModule,
        ToastModule

    ],
    declarations: [
        AppComponent,
        AppLoginComponent,
        HomeComponent,
        MajMdpComponent,
        RecupMdpComponent,
        CodeVerificationComponent,
        
    ],
    providers: [,
        AuthGuard,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        , BreadcrumbService, MessageService, MenuService,
        {provide: LOCALE_ID,
   useValue: 'fr'},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true
          },

    ],
    bootstrap: [AppComponent],

})

export class AppModule {
}
