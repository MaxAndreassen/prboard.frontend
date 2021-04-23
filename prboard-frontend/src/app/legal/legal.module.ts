import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { LegalRoutingModule } from './legal-routing.module';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    NgSelectModule,
    LegalRoutingModule
  ],
  declarations: [
    TermsAndConditionsComponent,
    PrivacyPolicyComponent
  ]
})
export class LegalModule { }
