import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';

import { UserService } from './components/shared/services/user.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthenticationGuard } from './components/shared/gaurds/authentication.guard';

import { PopoverModule } from 'ng2-popover';
import { IndexComponent } from './components/index/index.component';
import { SignupCreatorComponent } from './components/signup-creator/signup-creator.component';
import { SignupLoverComponent } from './components/signup-lover/signup-lover.component';
import { MilestoneComponent } from './components/milestone/milestone.component';

import { BetaService } from "./services/beta/beta.service";
import { CoreService } from "./services/core/core.service";
import { HttpInterceptororService } from "./services/httpinterceptor/http-interceptoror.service";
import { LocalstorageService } from "./services/localstorage/localstorage.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    IndexComponent,
    SignupCreatorComponent,
    SignupLoverComponent,
    MilestoneComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    PopoverModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    UserService, AuthenticationGuard, BetaService, CoreService,
    HttpInterceptororService,LocalstorageService,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptororService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}