import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

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
    ],
    declarations: [
        AppComponent,
        AppLoginComponent,
        HomeComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
         MenuService, BreadcrumbService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
