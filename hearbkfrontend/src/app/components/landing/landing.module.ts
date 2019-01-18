import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListenerComponent } from './listener/listener.component';
import { ContributorComponent } from './contributor/contributor.component';
import { LandingRoutingModule } from './landing-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LandingComponent } from './landing.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LandingRoutingModule,
  ],
  declarations: [ListenerComponent, ContributorComponent, LandingComponent]
})
export class LandingModule {
}
