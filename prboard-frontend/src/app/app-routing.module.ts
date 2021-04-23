import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityModule } from './security/security.module';
import { ProfileModule } from './profile/profile.module';
import { ReposModule } from './repos/repos.module';
import { PlanModule } from './plan/plan.module';
import { PrListComponent } from './git-accounts/components/pr-list/pr-list.component';
import { GitAccountModule } from './git-accounts/git-account.module';

const routes: Routes = [
  {
    path: '', component: PrListComponent
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
    path: 'connected',
    loadChildren: () => GitAccountModule
  },
  {
    path: 'repos',
    loadChildren: () => ReposModule
  },
  {
    path: 'plans',
    loadChildren: () => PlanModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
