import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepoPageComponent } from './components/repo-page/repo-page.component';

const routes: Routes = [
    { path: '', component: RepoPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReposRoutingModule { }
