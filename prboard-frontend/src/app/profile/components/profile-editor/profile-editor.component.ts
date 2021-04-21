import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserEditor } from '../../models/profile.models';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../../shared/models/auth.models';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Upload, FileSummary } from '../../../shared/models/file.models';
import { IValidationResult, ValidationResult } from '../../../shared/models/validation.models';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';
import { Account } from 'src/app/shared/models/payment.models';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {
  loading = false;
  initialPageLoading = false;
  validationResult: IValidationResult = new ValidationResult();
  successfullyUpdated = false;

  emailSending = false;
  emailSent = false;

  failed = false;
  editor: UserEditor = new UserEditor();

  firstName: string;
  lastName: string;
  username: string;

  uploadError = false;

  paymentCheckLoading = false;
  paymentLinkLoading = false;

  securityContext: SecurityContext;

  account: Account;

  existingProfileImage: FileSummary[] = [];

  affiliateUser: UserEditor;

  plus = faPlus;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private userService: UserService,
    private paymentService: PaymentService,
    private router: Router
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    if (!!this.securityContext && !!this.securityContext.user) {
      this.initialPageLoading = true;

      this.paymentCheckLoading = true;

      this.paymentService
        .getAccount(this.securityContext.user.uuid)
        .pipe(finalize(() => this.paymentCheckLoading = false))
        .subscribe(result => {
          this.account = result;

          this.authService.setPerformAdminCheck(true);
        });


      this.userService
        .getUser(this.securityContext.user.uuid)
        .pipe(finalize(() => this.initialPageLoading = false))
        .subscribe(result => {
          this.editor = result;
        });
    }
  }

  update(): any {
    this.loading = true;
    this.successfullyUpdated = false;

    this.userService
      .updateUser(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(result => {
        this.validationResult = new ValidationResult();
        this.successfullyUpdated = true;

        const validated = this.editor.isEmailVerified;
        this.editor = result;
        this.editor.isEmailVerified = validated;

        this.authService.updateUser(this.editor.name);

      }, err => {
        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        }
        if (err.status && err.status === 500) {
          this.validationResult = new ValidationResult('An Unknown Error Occured.');
        }
      });
  }

  logout(): any {
    this.authService.logout();
  }

  paymentOnboarding(): any {
    this.paymentLinkLoading = true;

    this.paymentService
      .createAccountLink('seller')
      .pipe(finalize(() => this.paymentLinkLoading = false))
      .subscribe(result => {
        document.location.href = result.url;
      });
  }


  updateProfileImage(uploads: Upload[]): any {
    this.existingProfileImage = [];

    if (!uploads || uploads.length === 0) {
      this.editor.profileImage = null;
      return;
    }

    this.editor.profileImage = uploads[0].file;
  }

  updateExistingProfileImage(existingFiles: FileSummary[]): any {
    if (!existingFiles || existingFiles.length === 0) {
      this.editor.existingProfileUuid = null;
    }

    this.editor.existingProfileUuid = existingFiles.map(p => p.uuid).find(p => true);
  }

  sendVerifyEmail(): any {
    this.emailSending = true;

    this.userService
      .resendVerifyEmail()
      .pipe(finalize(() => this.emailSending = false))
      .subscribe(p => {
        this.emailSent = true;
      });
  }
}
