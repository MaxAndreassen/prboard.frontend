import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SecurityContext } from 'src/app/shared/models/auth.models';
import { GitAccount } from 'src/app/shared/models/git-account.models';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ConnectAccountService } from 'src/app/shared/services/connect-accounts/connect-account.service';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.scss']
})
export class PrListComponent implements OnInit {
  securityContext: SecurityContext;

  connectedAccountsLoading = false;
  connectedAccounts: GitAccount[] = [];

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
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
