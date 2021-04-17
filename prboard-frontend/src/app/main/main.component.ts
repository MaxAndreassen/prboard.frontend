import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { SecurityContext } from '../shared/models/auth.models';
import { isPlatformServer } from '@angular/common';
import { faFutbol, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  securityContext: SecurityContext;

  football = faFutbol;
  gamepad = faGamepad;

  siteMode = 'esports';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
    });
  }

  navigateEsports(): any {
    this.router.navigateByUrl('tournaments/search?modeUuid=1125f111-f5e6-4da0-8231-280ebf07161f&siteMode=esports');
  }

  navigateGrassroot(): any {
    this.router.navigateByUrl('tournaments/search?modeUuid=1225f111-f5e6-4da0-8231-280ebf07161f&siteMode=grassroot');
  }

}
