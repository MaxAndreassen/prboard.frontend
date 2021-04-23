import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, IAppConfig } from 'src/app/shared/models/configuration.models';
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
  ) { }

  ngOnInit(): any {
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
