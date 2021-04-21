import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectedGitAccountsComponent } from './components/connected-git-accounts/connected-git-accounts.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { ConnectGithubComponent } from './components/connect-github/connect-github.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  declarations: [MainComponent, SideNavComponent, ConnectedGitAccountsComponent, ConnectGithubComponent],
  exports: [SideNavComponent]
})
export class MainModule { }
