import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Email } from '../../shared/models/auth.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { IValidationResult, ValidationResult } from '../../shared/models/validation.models';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  editor = new Email();
  validationResult: IValidationResult;
  loading = false;

  failed = false;
  succeeded = false;

  affiliateUserUuid: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.route.queryParamMap.subscribe(params => {
      this.affiliateUserUuid = params.get('affiliate');
    });
  }

  submit(): any {
    this.loading = true;
    this.failed = false;
    this.succeeded = false;

    this.authService.forgottenPassword(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(p => this.succeeded = true, err => {
        this.failed = true;

        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        } else {
          this.validationResult = new ValidationResult('Unknown Error.');
        }
      });
  }

  routeLogin(): any {
    if (!!this.affiliateUserUuid) {
      this.router.navigateByUrl(`/security/login?affiliate=${this.affiliateUserUuid}`);
    } else {
      this.router.navigateByUrl(`/security/login`);
    }
  }

  routeRegister(): any {
    if (!!this.affiliateUserUuid) {
      this.router.navigateByUrl(`/security/register?affiliate=${this.affiliateUserUuid}`);
    } else {
      this.router.navigateByUrl(`/security/register`);
    }
  }
}
