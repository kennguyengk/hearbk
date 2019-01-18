import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ListenerhomeComponent } from './listenerhome/listenerhome.component';
import { ContributorhomeComponent } from './contributorhome/contributorhome.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [ListenerhomeComponent, ContributorhomeComponent, HomeComponent]
})
export class HomeModule { }
