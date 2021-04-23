import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { VerifyLandingComponent } from './components/verify-landing/verify-landing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    ProfileEditorComponent,
    VerifyLandingComponent
  ]
})
export class ProfileModule { }
