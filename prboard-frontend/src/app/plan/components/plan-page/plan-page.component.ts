import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityContext } from 'src/app/shared/models/auth.models';
import { APP_CONFIG, IAppConfig } from 'src/app/shared/models/configuration.models';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SubscriptionService } from '../../services/subscription-service/subscription.service';

@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.scss']
})
export class PlanPageComponent implements OnInit {

  stripe: any;

  constructor(
    private subscriptionService: SubscriptionService,
    @Inject(APP_CONFIG) public config: IAppConfig,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      if (!context.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    // @ts-ignore
    this.stripe = Stripe(this.config.stripeApiKey);
  }

  subscribe(priceId: string): any {
    this.subscriptionService
      .createSession({ priceId })
      .subscribe(p => {
        this.stripe.redirectToCheckout({
          sessionId: p.sessionId
        }).then(e => {
          console.log(e);
        });
      });
  }

}
