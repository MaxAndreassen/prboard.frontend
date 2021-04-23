import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanPageComponent } from './components/plan-page/plan-page.component';
import { PlanSuccessPageComponent } from './components/plan-success-page/plan-success-page.component';

const routes: Routes = [
    { path: '', component: PlanPageComponent },
    { path: 'success', component: PlanSuccessPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanRoutingModule { }
