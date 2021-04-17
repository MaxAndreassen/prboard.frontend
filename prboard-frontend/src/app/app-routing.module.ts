import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityModule } from './security/security.module';
import { ProfileModule } from './profile/profile.module';
import { CheckOutModule } from './check-out/check-out.module';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'security',
    loadChildren: () => SecurityModule
  },
  {
    path: 'profile',
    loadChildren: () => ProfileModule
  },
  {
    path: 'purchase',
    loadChildren: () => CheckOutModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
