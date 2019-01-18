import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { SignupCreatorComponent } from './components/signup-creator/signup-creator.component';
import { SignupLoverComponent } from './components/signup-lover/signup-lover.component';
import { MilestoneComponent } from './components/milestone/milestone.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  /* {
    path: 'foundersclub',
    component: IndexComponent
  }, */
  {
    path: 'launch',
    component: IndexComponent
  },
  {
    path: 'subscribe-creator/:email',
    component: SignupCreatorComponent
  },
  {
    path: 'subscribe-lover/:email',
    component: SignupLoverComponent
  },
  {
    path: 'home',
    loadChildren: 'app/components/home/home.module#HomeModule'
  },
  {
    path: 'landing',
    loadChildren: 'app/components/landing/landing.module#LandingModule'
  },
  {
    path: 'user',
    loadChildren: 'app/components/user/user.module#UserModule'
  },
  {
    path: 'users',
    loadChildren: 'app/components/authuser/authuser.module#AuthuserModule'
  },
  {
    path: 'milestone',
    component: MilestoneComponent
  },
  

];

@NgModule({
  imports:[
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }