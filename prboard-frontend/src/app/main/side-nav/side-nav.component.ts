import { Component, OnInit, PLATFORM_ID, Inject, AfterContentInit, AfterContentChecked } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import {
  faAngleRight,
  faAngleLeft,
  faTag,
  faUser,
  faArchive,
  faBox,
  faReceipt,
  faPoundSign,
  faTrophy,
  faMoneyBill,
  faMoneyBillWave,
  faClipboard,
  faMedal,
  faUsers,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../shared/models/auth.models';
import { PaymentService } from '../../shared/services/payment/payment.service';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../profile/services/user.service';
import { Account } from '../../shared/models/payment.models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sidebarEnabled = true;
  toggleIconOn = faAngleRight;
  toggleIconOff = faAngleLeft;
  sellIcon = faPoundSign;
  checkboardIcon = faClipboard;

  adminUser = false;
  isOrganiser = false;
  paymentCheckLoading = false;

  sellerNavItems: DashboardSideNavItem[] = [
    {
      url: 'tournaments/organise',
      title: 'Manage Events',
      icon: faClipboard,
      chargesRequired: false
    },
    {
      url: 'stats/financials',
      title: 'Sales',
      icon: faReceipt,
      chargesRequired: true
    },
    {
      url: 'stats/financials/payout',
      title: 'Payouts',
      icon: faPoundSign,
      chargesRequired: true
    }
  ];

  otherNavItems: DashboardSideNavItem[] = [
    {
      url: 'profile/edit',
      title: 'Profile',
      icon: faUser,
    }
  ];

  buyerNavItems: DashboardSideNavItem[] = [
    {
      url: 'tournaments/owned',
      title: 'My Events',
      icon: faTrophy,
    },
    {
      url: 'teams/owned',
      title: 'My Teams',
      icon: faUserFriends,
    }
  ];

  adminNavItems: DashboardSideNavItem[] = [
  ];

  securityContext: SecurityContext;
  account: Account = new Account();

  constructor(
    private authService: AuthService,
    private router: Router,
    private paymentService: PaymentService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.sidebarEnabled = this.authService.getSideNavState();
    this.authService.sidebarEmitter.emit(this.sidebarEnabled);
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.account.chargesEnabled = this.authService.getChargesEnabled();
    this.isOrganiser = this.authService.getIsOrganiser();
    this.securityContext = this.authService.securityContext;

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      if (!!context && !!context.user) {
        if (this.securityContext == null ||
          context.authenticated !== this.securityContext.authenticated || this.securityContext.user.uuid !== context.user.uuid) {
          this.paymentCheckLoading = true;

          this.userService.getUser(context.user.uuid)
            .subscribe(res => {
              this.adminUser = res.isAdmin;
              this.isOrganiser = res.isOrganiser;
              this.authService.setIsOrganiser(res.isOrganiser);
              this.authService.setPerformAdminCheck(res.isAdmin);
            });

          this.paymentService
            .getAccount(context.user.uuid)
            .pipe(finalize(() => this.paymentCheckLoading = false))
            .subscribe(result => {
              if (!!result) {
                this.account = result;
                this.authService.setChargesEnabled(result.chargesEnabled);
              } else {
                this.account.chargesEnabled = false;
                this.authService.setChargesEnabled(false);
              }
            });
        } else {
          if (!context || !context.user) {
            this.authService.setChargesEnabled(false);
            this.account = new Account();
          }
        }
      }

      this.securityContext = context;
    });

    if (this.securityContext.authenticated && this.authService.getPerformAdminCheck()) {
      this.paymentService
      .getAccount(this.securityContext.user.uuid)
      .pipe(finalize(() => this.paymentCheckLoading = false))
      .subscribe(result => {
        if (!!result) {
          this.account = result;
          this.authService.setChargesEnabled(result.chargesEnabled);
        } else {
          this.account.chargesEnabled = false;
          this.authService.setChargesEnabled(false);
        }
      });

      this.userService.getUser(this.securityContext.user.uuid)
        .subscribe(res => {
          this.adminUser = res.isAdmin;
          this.isOrganiser = res.isOrganiser;
          this.authService.setIsOrganiser(res.isOrganiser);
          this.authService.setPerformAdminCheck(res.isAdmin);
        });
    }

    this.authService.securityCheck();
  }

  toggleSidebar(): any {
    this.sidebarEnabled = !this.sidebarEnabled;
    this.authService.setSideNavState(this.sidebarEnabled);
    this.authService.sidebarEmitter.emit(this.sidebarEnabled);
  }
}

interface DashboardSideNavItem {
  url: string;
  title: string;
  icon: any;
  isPaid?: boolean;
  isAdmin?: boolean;
  chargesRequired?: boolean;
}
