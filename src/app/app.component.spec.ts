/* tslint:disable:no-unused-variable */

import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppMainComponent } from './core/app-layout/main/app.main.component';
import { AppTopBarComponent } from './core/app-layout/top-bar/app.topbar.component';
import { AppFooterComponent } from './core/app-layout/footer/app.footer.component';
import { AppMenuComponent } from './core/app-layout/side-menu/app.menu.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { AppRightPanelComponent } from './core/app-layout/right-panel/app.rightpanel.component';
import { AppBreadcrumbComponent } from './core/breadcrumb/app.breadcrumb.component';
import { BreadcrumbService } from './core/breadcrumb/breadcrumb.service';

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ScrollPanelModule, CalendarModule, TabViewModule, CheckboxModule],
            declarations: [
                AppComponent,
                AppMainComponent,
                AppMenuComponent,
                AppTopBarComponent,
                AppRightPanelComponent,
                AppFooterComponent,
                AppBreadcrumbComponent
            ],
            providers: [BreadcrumbService]
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
