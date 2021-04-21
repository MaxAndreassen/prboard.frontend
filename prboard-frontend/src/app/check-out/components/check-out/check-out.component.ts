import { Component, OnInit, Inject, Input, Output, EventEmitter, PLATFORM_ID } from '@angular/core';
import { PaymentIntentSecret } from '../../../shared/models/payment.models';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { finalize } from 'rxjs/operators';
import { IAppConfig, APP_CONFIG } from '../../../shared/models/configuration.models';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SecurityContext } from '../../../shared/models/auth.models';
import { TournamentPromoSummary, TournamentSummary, TournamentUserEditor } from '../../../shared/models/tournaments.models';
import { isPlatformServer } from '@angular/common';
import { UserCreditService } from 'src/app/shared/services/user-credit/user-credit.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  loading = false;
  productLoading = false;
  failed = false;

  paymentSubmitted = false;
  paymentLoading = false;
  paymentSucceed = false;
  paymentFailed = false;
  failureReason = '';

  creditPurchaseLoading = false;
  userCreditLoading = false;

  paymentIntent: PaymentIntentSecret;

  tournamentSummary: TournamentSummary = new TournamentSummary();

  stripe: any;
  card: any;

  vat: number;

  applePayAvailable = false;

  purchaseId: string;

  isGuest = false;

  securityContext: SecurityContext;

  promoUuid: string;
  promo: TournamentPromoSummary;
  promoLoading = false;
  promoAmount: number;

  credit: number;
  enoughCredit: boolean;

  @Input() tournamentUuid: string;
  @Input() alias: string;
  @Input() teamUuid: string;
  @Input() userUuid: string;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private paymentService: PaymentService,
    @Inject(APP_CONFIG) public config: IAppConfig,
    @Inject(PLATFORM_ID) private platformId: any,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userCreditService: UserCreditService
  ) {

  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.route.queryParamMap.subscribe(params => {
      this.promoUuid = params.get('promo');
    });

    this.productLoading = true;

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;
    });

    this.loading = true;
    this.paymentService
      .createPaymentIntent(null, this.securityContext.user.uuid, this.promoUuid, this.teamUuid)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.paymentIntent = res;
        this.setupStripe();
      }, err => {
        this.failed = true;
      });
  }

  getCredit(): any {
    if (this.securityContext != null && this.securityContext.user != null) {
      this.userCreditLoading = true;

      this.userCreditService
        .getTotalCreditForUser(this.securityContext.user.uuid)
        .pipe(finalize(() => this.userCreditLoading = false))
        .subscribe(p => {
          this.credit = p.creditInPence;

          const total = !this.promoAmount ? this.tournamentSummary?.entryFeeInPounds + this.vat :
            this.tournamentSummary?.entryFeeInPounds + this.vat - this.promoAmount;

          this.enoughCredit = this.credit >= total * 100;
        });
    }
  }

  setupStripe(): any {
    /* tslint:disable */
    //@ts-ignore
    this.stripe = Stripe(this.config.stripeApiKey);
    var elements = this.stripe.elements();

    var style = {
      base: {
        color: "#32325d",
      }
    };

    this.card = elements.create("card", { style: style });
    this.card.mount("#card-element");

    this.card.on('change', ({ error }) => {
      let displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });

    this.applePaySetup();
    /* tslint:enable */
  }

  submit(ev: any): any {

    this.paymentSubmitted = true;
    this.paymentLoading = true;


    /* tslint:disable */
    ev.preventDefault();
    this.stripe.confirmCardPayment(this.paymentIntent.secretKey, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: 'Test Name'
        }
      }
    }).then(result => {
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        this.paymentLoading = false;
        this.paymentFailed = true;
        this.paymentSubmitted = false;
        this.failureReason = result.error.message;
        this.paymentSucceed = false;
        try {
          ev.complete('fail');
        } catch {
        }
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          try {
            ev.complete('success');
          } catch {
          }
          this.purchaseId = result.paymentIntent.id;

          const editor = new TournamentUserEditor();
          editor.userUuid = this.securityContext.user.uuid;
          editor.tournamentUuid = this.tournamentSummary.uuid;
          editor.userAlias = this.alias;
          editor.transactionIdentifier = result.paymentIntent.id;
          editor.teamUuid = this.teamUuid;

          /*this.tournamentUserService
            .createTournamentUser(editor)
            .pipe(finalize(() => {
              this.paymentLoading = false;
              this.paymentSucceed = true;
              this.paymentFailed = false;
              this.closeModal.emit(true);
            }))
            .subscribe(res => {
            });*/

          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
    /* tslint:enable */
  }

  enter(): any {

  }

  useCredit(): any {
    this.creditPurchaseLoading = true;

    this.paymentService
      .purchaseWithCredit(this.paymentIntent.uuid)
      .pipe(finalize(() => this.creditPurchaseLoading = false))
      .subscribe(p => {
        this.paymentLoading = false;
        this.paymentSucceed = true;
        this.paymentFailed = false;
        this.closeModal.emit(true);
      }, err => {
        this.paymentFailed = true;
        this.failureReason = 'Credit payment failed.';
      });
  }

  applePaySetup(): any {
    const paymentRequest = this.stripe.paymentRequest({
      country: 'GB',
      currency: 'gbp',
      total: {
        label: 'Total',
        amount: (this.tournamentSummary?.entryFeeInPounds + this.vat) * 100,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const elements = this.stripe.elements();
    const prButton = elements.create('paymentRequestButton', { paymentRequest });

    // prButton.mount('#payment-request-button');

    // Check the availability of the Payment Request API first.
    paymentRequest.canMakePayment().then(result => {
      if (result) {
        this.applePayAvailable = true;
        prButton.mount('#payment-request-button');
      } else {
        document.getElementById('payment-request-button').style.display = 'none';
      }
    });

    paymentRequest.on('paymentmethod', ev => {
      // Confirm the PaymentIntent without handling potential next actions (yet).
      this.stripe.confirmCardPayment(
        this.paymentIntent.secretKey,
        { payment_method: ev.paymentMethod.id },
        { handleActions: false }
      ).then(result => {
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          this.paymentLoading = false;
          this.paymentFailed = true;
          this.paymentSubmitted = false;
          this.failureReason = result.error.message;
          this.paymentSucceed = false;
          ev.complete('fail');
        } else {
          ev.complete('success');
          // The payment has been processed!
          console.log(result.paymentIntent.status);
          if (result.paymentIntent.status === 'succeeded') {
            this.purchaseId = result.paymentIntent.id;

            const editor = new TournamentUserEditor();
            editor.userUuid = this.securityContext.user.uuid;
            editor.tournamentUuid = this.tournamentSummary.uuid;
            editor.userAlias = this.alias;
            editor.teamUuid = this.teamUuid;
            editor.transactionIdentifier = result.paymentIntent.id;

            /*this.tournamentUserService
              .createTournamentUser(editor)
              .pipe(finalize(() => {
                this.paymentLoading = false;
                this.paymentSucceed = true;
                this.paymentFailed = false;
                this.closeModal.emit(true);
              }))
              .subscribe(res => {
              });*/

            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          }
        }
      });
    });
  }
}
