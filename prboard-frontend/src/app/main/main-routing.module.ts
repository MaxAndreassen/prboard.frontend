import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectedGitAccountsComponent } from './components/connected-git-accounts/connected-git-accounts.component';
import { ConnectGithubComponent } from './components/connect-github/connect-github.component';


const routes: Routes = [
    { path: '', component: ConnectedGitAccountsComponent },
    { path: 'github', component: ConnectGithubComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
