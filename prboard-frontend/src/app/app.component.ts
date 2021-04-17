import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SecurityContext } from './shared/models/auth.models';
import { AuthService } from './shared/services/auth/auth.service';
import { isPlatformServer } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { faToggleOn, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-template';
  sideBarOpen = true;
  toggleOn = faToggleOn;
  searchIcon = faSearch;
  burger = faBars;

  burgerNavOpen = false;

  securityContext: SecurityContext = new SecurityContext();

  siteMode = '';
  hideOverflow = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.sidebarEmitter
      .subscribe(p => this.sideBarOpen = p);

    this.authService.securityCheck();
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;
    });

    this.route.queryParamMap.subscribe(params => {
      this.siteMode = params.get('siteMode');
      this.hideOverflow = params.get('overflow');
    });
  }

  routeLogin(): any {
    this.router.navigateByUrl('/security/login');
  }

  signOut(): any {
    this.authService.logout();
    this.burgerNavOpen = false;
  }

  toggleBurgerNav(): any {
    this.burgerNavOpen = !this.burgerNavOpen;
  }
}
