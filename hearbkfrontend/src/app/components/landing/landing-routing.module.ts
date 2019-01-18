import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListenerComponent } from './listener/listener.component';
import { ContributorComponent } from './contributor/contributor.component';

const routes: Routes = [
  { path: '', redirectTo:"listener", pathMatch:'full' },
  {
    path: 'listener',
    component: ListenerComponent
  },
  {
    path: 'contributor',
    component: ContributorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})


export class LandingRoutingModule { }
