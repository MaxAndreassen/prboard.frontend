import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityModule } from './security/security.module';
import { ProfileModule } from './profile/profile.module';
import { CheckOutModule } from './check-out/check-out.module';
import { MainComponent } from './main/main.component';
import { ConnectedGitAccountsComponent } from './main/components/connected-git-accounts/connected-git-accounts.component';
import { MainModule } from './main/main.module';
import { ReposModule } from './repos/repos.module';

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
  },
  {
    path: 'connected',
    loadChildren: () => MainModule
  },
  {
    path: 'repos',
    loadChildren: () => ReposModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
