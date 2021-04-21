import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs/operators';
import { SecurityContext } from 'src/app/shared/models/auth.models';
import { GitAccount } from 'src/app/shared/models/git-account.models';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ConnectAccountService } from 'src/app/shared/services/connect-accounts/connect-account.service';

@Component({
  selector: 'app-connected-git-accounts',
  templateUrl: './connected-git-accounts.component.html',
  styleUrls: ['./connected-git-accounts.component.scss']
})
export class ConnectedGitAccountsComponent implements OnInit {

  plus = faPlus;
  securityContext: SecurityContext;

  newGitAccountSourceUuid: string;
  requestPrivate: string;

  connectedAccounts: GitAccount[] = [];
  connectedAccountsLoading = false;

  gitOptions = [
    {
      name: 'GitHub',
      imageSource: 'github',
      uuid: 'github'
    },
    {
      name: 'BitBucket',
      imageSource: 'bitbucket',
      uuid: 'bitbucket'
    }
  ];

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private connectedAccountService: ConnectAccountService
  ) { }

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

    this.connectedAccountService
      .listAccounts()
      .pipe(finalize(() => this.connectedAccountsLoading = false))
      .subscribe(p => {
        this.connectedAccounts = p;
      });
  }

  connect(): any {
    if (this.newGitAccountSourceUuid === 'github') {
      if (this.requestPrivate) {
        window.open('https://www.github.com/login/oauth/authorize?client_id=7f949bdfbb15c8f650d8&redirect_uri=http://localhost:4200/connected/github&scope=repo,user');
      } else {
        window.open('https://www.github.com/login/oauth/authorize?client_id=7f949bdfbb15c8f650d8&redirect_uri=http://localhost:4200/connected/github,user');
      }
    }
  }

  privateRepos(event: any): any {
    this.requestPrivate = event.target.checked;
  }

}
