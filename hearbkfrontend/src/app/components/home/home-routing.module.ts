import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContributorhomeComponent } from './contributorhome/contributorhome.component';
import { ListenerhomeComponent } from './listenerhome/listenerhome.component';


const routes: Routes = [
  { path: '', component: ListenerhomeComponent },
  {
    path: 'listenerhome',
    component: ListenerhomeComponent
  },
  {
    path: 'contributorhome',
    component: ContributorhomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
