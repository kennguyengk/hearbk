import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LinkexpireComponent } from './linkexpire/linkexpire.component';

import {UserRoutingModule} from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//import constants
import {fbkey} from '../shared/constants';
import {captchaKey} from '../shared/constants';

//importing npm modules
import { NgxCaptchaModule } from 'ngx-captcha';
import { FileDropModule } from 'ngx-file-drop';
import {
    SocialLoginModule,
    AuthServiceConfig,
    FacebookLoginProvider,
} from 'angular5-social-login';
import { UserComponent } from './user.component';


//for facebook signup
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(fbkey)
        }
      ]
  );
  return config;
}


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FileDropModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgxCaptchaModule.forRoot({
		invisibleCaptchaSiteKey: captchaKey
    }),
  ],
  declarations: [SignupComponent, LoginComponent, ForgetpasswordComponent, LinkexpireComponent, UserComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})
export class UserModule { }
