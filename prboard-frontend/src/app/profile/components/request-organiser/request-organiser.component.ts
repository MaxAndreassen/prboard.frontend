import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RequestOrganiser, SecurityContext } from 'src/app/shared/models/auth.models';
import { IValidationResult, ValidationResult } from 'src/app/shared/models/validation.models';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-request-organiser',
  templateUrl: './request-organiser.component.html',
  styleUrls: ['./request-organiser.component.scss']
})
export class RequestOrganiserComponent implements OnInit {
  editor = new RequestOrganiser();
  validationResult: IValidationResult;
  loading = false;

  failed = false;
  succeeded = false;

  securityContext: SecurityContext;

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

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login?redirect=true');
      }
    });
  }

  submit(): any {
    this.loading = true;
    this.failed = false;
    this.succeeded = false;

    this.authService.requestOrganiser(this.editor)
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
}
