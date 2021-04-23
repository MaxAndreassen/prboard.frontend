import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectedGitAccountsComponent } from './components/connected-git-accounts/connected-git-accounts.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ConnectGithubComponent } from './components/connect-github/connect-github.component';
import { GitAccountRoutingModule } from './git-account-routing.module';
import { PrListComponent } from './components/pr-list/pr-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    GitAccountRoutingModule
  ],
  declarations: [PrListComponent, ConnectedGitAccountsComponent, ConnectGithubComponent],
  exports: []
})
export class GitAccountModule { }
