import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AuthenticationRequest, User } from '../../shared/models/auth.models';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { Location, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  editor = new AuthenticationRequest();
  // validationResult: IValidationResult;
  loading = false;
  failed = false;
  newPassword = false;
  affiliateUserUuid: string;

  redirect = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.route.queryParamMap.subscribe(params => {
      this.affiliateUserUuid = params.get('affiliate');
    });

    this.route.queryParams.subscribe(params => {
      /* tslint:disable:no-string-literal */
      const email = params['email'];
      this.redirect = params['redirect'] === 'true';

      if (!!email) {
        this.editor.email = email;
      }
      /* tslint:enable:no-string-literal */

    });
  }

  login(): any {
    this.loading = true;

    this.authService
      .login<User>(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.failed = false;
        this.redirect ? this.location.back() : this.router.navigateByUrl('/');
      }, err => {
        if (err.status && (err.status === 412 || err.status === 401 || err.status === 400)) {
          this.failed = true;
        }
      });
  }

  routeRegister(): any {
    if (!!this.affiliateUserUuid) {
      this.router.navigateByUrl(`/security/register?affiliate=${this.affiliateUserUuid}`);
    } else {
      this.router.navigateByUrl(`/security/register`);
    }
  }

  routeForgottenPassword(): any {
    if (!!this.affiliateUserUuid) {
      this.router.navigateByUrl(`/security/forgotten-password?affiliate=${this.affiliateUserUuid}`);
    } else {
      this.router.navigateByUrl(`/security/forgotten-password`);
    }
  }
}
