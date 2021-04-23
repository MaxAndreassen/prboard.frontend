import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SecurityContext } from 'src/app/shared/models/auth.models';
import { GitRepo } from 'src/app/shared/models/git-account.models';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ConnectAccountService } from 'src/app/shared/services/connect-accounts/connect-account.service';

@Component({
  selector: 'app-repo-page',
  templateUrl: './repo-page.component.html',
  styleUrls: ['./repo-page.component.scss']
})
export class RepoPageComponent implements OnInit {
  securityContext: SecurityContext;

  siteMode = '';

  connectedReposLoading = false;
  connectedRepos: GitRepo[] = [];

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

    this.connectedReposLoading = true;

    this.connectAccountService
      .listRepos()
      .pipe(finalize(() => this.connectedReposLoading = false))
      .subscribe(p => {
        this.connectedRepos = p;
      });
  }

  routeConnect(): any {
    this.router.navigateByUrl('connected');
  }
}
