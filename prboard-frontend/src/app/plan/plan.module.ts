import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanPageComponent } from './components/plan-page/plan-page.component';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanSuccessPageComponent } from './components/plan-success-page/plan-success-page.component';

@NgModule({
  imports: [
    CommonModule,
    PlanRoutingModule
  ],
  declarations: [
    PlanPageComponent,
    PlanSuccessPageComponent
  ]
})
export class PlanModule { }
