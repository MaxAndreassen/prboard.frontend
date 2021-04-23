import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoPageComponent } from './components/repo-page/repo-page.component';
import { ReposRoutingModule } from './repos-routing.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    ReposRoutingModule
  ],
  declarations: [RepoPageComponent]
})
export class ReposModule { }
