import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationSummaryComponent } from './components/validation-summary/validation-summary.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileGalleryComponent } from './components/file-gallery/file-gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { PrCardComponent } from './components/pr-card/pr-card.component';
import { ConnectedAccountCardComponent } from './components/connected-account-card/connected-account-card.component';
import { RepoCardComponent } from './components/repo-card/repo-card.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    ValidationSummaryComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent,
    FileGalleryComponent,
    PrCardComponent,
    ConnectedAccountCardComponent,
    RepoCardComponent
  ],
  exports: [
    ValidationSummaryComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent,
    FileGalleryComponent,
    PrCardComponent,
    ConnectedAccountCardComponent,
    RepoCardComponent
  ]
})
export class SharedModule { }
