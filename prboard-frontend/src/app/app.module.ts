import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_CONFIG } from './shared/models/configuration.models';
import { AppConfig } from './app.config';
import { AuthInterceptor } from './shared/services/auth-interceptor/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { getErrorHandler } from './sentry-error-handler';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ReposModule } from './repos/repos.module';
import { PlanModule } from './plan/plan.module';
import { GitAccountModule } from './git-accounts/git-account.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    SecurityModule,
    ProfileModule,
    GitAccountModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    NgSelectModule,
    ReposModule,
    PlanModule
  ],
  providers: [
    { provide: APP_CONFIG, useClass: AppConfig },
    {
      provide: ErrorHandler, useFactory: getErrorHandler
    },
    NgxImageCompressService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
