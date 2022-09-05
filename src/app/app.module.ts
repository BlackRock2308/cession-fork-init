import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Components for demos
import {FullCalendarModule} from '@fullcalendar/angular';

// Application Components
import {AppComponent} from './app.component';
import {AppLoginComponent} from './auth/login/app.login.component';

// Demo pages



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
import { ProductService } from './workstation/service/product/product.service';
import { MessageService } from 'primeng/api';
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
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
         MenuService, BreadcrumbService,ProductService,MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
