import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { SecurityContext } from '../shared/models/auth.models';
import { isPlatformServer } from '@angular/common';
import { faFutbol, faGamepad, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { GitAccount } from '../shared/models/git-account.models';
import { ConnectAccountService } from '../shared/services/connect-accounts/connect-account.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  securityContext: SecurityContext;

  football = faFutbol;
  gamepad = faGamepad;

  plus = faPlus;

  siteMode = 'esports';

  connectedAccountsLoading = false;
  connectedAccounts: GitAccount[] = [];

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private route: ActivatedRoute,
    private connectAccountService: ConnectAccountService
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.route.queryParamMap.subscribe(params => {
      this.siteMode = params.get('siteMode');
    });

    this.connectedAccountsLoading = true;

    this.connectAccountService
      .listAccounts()
      .pipe(finalize(() => this.connectedAccountsLoading = false))
      .subscribe(p => {
        this.connectedAccounts = p;
      });
  }

  routeConnect(): any {
    this.router.navigateByUrl('connected');
  }
}
