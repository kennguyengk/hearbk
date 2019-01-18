import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LinkexpireComponent } from './linkexpire/linkexpire.component';

const routes: Routes = [
  {
    path: 'signup/:type',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'forgetpassword',
    component: ForgetpasswordComponent
  },
   {
    path: 'expirelink',
    component: LinkexpireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
