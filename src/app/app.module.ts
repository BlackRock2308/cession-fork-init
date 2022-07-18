import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// PrimeNG Components for demos
import {FullCalendarModule} from '@fullcalendar/angular';

// Application Components
import {AppComponent} from './app.component';
import {AppMainComponent} from './core/app-layout/main/app.main.component';
import {AppNotfoundComponent} from './core/not-found/app.notfound.component';
import {AppErrorComponent} from './core/error/app.error.component';
import {AppAccessdeniedComponent} from './core/access-denied/app.accessdenied.component';
import {AppLoginComponent} from './auth/login/app.login.component';
import {AppMenuComponent} from './core/app-layout/side-menu/app.menu.component';
import {AppMenuitemComponent} from './core/app-layout/side-menu/app.menuitem.component';
import {AppBreadcrumbComponent} from './core/breadcrumb/app.breadcrumb.component';
import {AppRightPanelComponent} from './core/app-layout/right-panel/app.rightpanel.component';
import {AppTopBarComponent} from './core/app-layout/top-bar/app.topbar.component';
import {AppFooterComponent} from './core/app-layout/footer/app.footer.component';

// Demo pages
import {DashboardComponent} from './core/dashboard/dashboard.component';

// Demo services
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {CustomerService} from './demo/service/customerservice';
import {PhotoService} from './demo/service/photoservice';
import {ProductService} from './demo/service/productservice';
import {IconService} from './demo/service/iconservice';
import {ConfigService} from './demo/service/app.config.service';

// Application services
import {BreadcrumbService} from './core/breadcrumb/breadcrumb.service';
import {MenuService} from './core/app-layout/side-menu/app.menu.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CoreModule} from './core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

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
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppBreadcrumbComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        DashboardComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService, BreadcrumbService, ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
