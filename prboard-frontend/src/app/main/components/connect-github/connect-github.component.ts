import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityContext } from 'src/app/shared/models/auth.models';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ConnectAccountService } from 'src/app/shared/services/connect-accounts/connect-account.service';

@Component({
  selector: 'app-connect-github',
  templateUrl: './connect-github.component.html',
  styleUrls: ['./connect-github.component.scss']
})
export class ConnectGithubComponent implements OnInit {
  code: string;

  securityContext: SecurityContext;

  constructor(
    private connectAccountService: ConnectAccountService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): any {
    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.route.queryParamMap.subscribe(params => {
      this.code = params.get('code');
      this.connectAccountService
        .connectGitHub(this.code)
        .subscribe(p => {
          this.router.navigateByUrl('/connected');
        });
    });
  }
}
