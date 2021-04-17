import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SignUpRequest } from '../../shared/models/auth.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { IValidationResult, ValidationResult } from '../../shared/models/validation.models';
import { isPlatformServer } from '@angular/common';
import { CountryService } from '../../shared/services/country/country.service';
import { CountrySummary } from '../../shared/models/country.models';
import { UserService } from 'src/app/profile/services/user.service';
import { MatchUserSummary } from 'src/app/shared/models/match.models';
import { UserEditor } from 'src/app/profile/models/profile.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  editor = new SignUpRequest();
  validationResult: IValidationResult = new ValidationResult();
  loading = false;
  deactivated = false;
  reactivate = false;
  redirectUrl: string = null;
  affiliateUserUuid: string;

  countries: CountrySummary[] = [];
  countriesLoading = false;

  tocAccepted = false;

  affiliateUser: UserEditor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private countryService: CountryService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.route.queryParamMap.subscribe(params => {
      this.affiliateUserUuid = params.get('affiliate');
      this.editor.isBusiness = !!params.get('business');
      this.editor.affiliateUserUuid = this.affiliateUserUuid;
    });

    if (!!this.affiliateUserUuid) {
      this.userService.getUser(this.affiliateUserUuid)
        .pipe(finalize(() => { }))
        .subscribe(p => {
          this.affiliateUser = p;
        });
    }

    this.countriesLoading = true;

    this.countryService
      .listCountries()
      .pipe(finalize(() => this.countriesLoading = false))
      .subscribe(p => {
        this.countries = p;
      });
  }

  setBusiness(event: boolean): any {
    this.editor.isBusiness = event;
  }

  onMarketingOptInChange(event: any): any {
    this.editor.optedIntoMarketingEmails = event.target.checked;
  }

  acceptToc(event: any): any {
    this.tocAccepted = event.target.checked;
  }

  register(): any {
    this.loading = true;
    this.validationResult = new ValidationResult();

    this.authService
      .register(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.router.navigateByUrl('/security/login');
      }, err => {
        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        }
        if (err.status && err.status === 500) {
          this.validationResult = new ValidationResult('An Unknown Error Occured.');
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
}
