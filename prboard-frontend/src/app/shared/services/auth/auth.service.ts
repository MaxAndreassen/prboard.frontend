import { Injectable, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  SecurityContext,
  AuthenticationRequest,
  AuthenticatedUser,
  IAuthenticationResponse,
  User,
  SignUpRequest,
  Email,
  PasswordReset,
  RequestOrganiser
} from '../../models/auth.models';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStateChange$: BehaviorSubject<SecurityContext>;
  sidebarEmitter: EventEmitter<boolean> = new EventEmitter();

  get securityContext(): SecurityContext {
    const authUser = new SecurityContext();

    if (!isPlatformBrowser(this.platformId)) {
      return authUser;
    }

    const user = this.currentUser<AuthenticatedUser>();

    authUser.user = user;
    authUser.authenticated = !!localStorage.getItem(this.AUTH_TOKEN_KEY);

    return authUser;
  }

  private readonly AUTH_TOKEN_KEY: string = 'auth_token';
  private readonly USER_KEY: string = 'auth_user';
  private readonly EMAIL_KEY: string = 'auth_username';

  private readonly SIDENAV: string = 'side_nav_open';
  private readonly CHARGES_ENABLED: string = 'charges_enabled';
  private readonly ORGANISER: string = 'organiser';
  private readonly PERFORM_ADMIN_CHECK: string = 'perform_admin_check';
  private readonly GUEST_UUID: string = 'guest_user_uuid';

  private user: any;

  public setSideNavState(open: boolean): any {
    localStorage.setItem(this.SIDENAV, open ? '1' : '0');
  }

  public getSideNavState(): boolean {
    return localStorage.getItem(this.SIDENAV) === '1' ? true : false;
  }

  public setChargesEnabled(open: boolean): any {
    localStorage.setItem(this.CHARGES_ENABLED, open ? '1' : '0');
  }

  public getChargesEnabled(): boolean {
    return localStorage.getItem(this.CHARGES_ENABLED) === '1' ? true : false;
  }

  public setIsOrganiser(open: boolean): any {
    localStorage.setItem(this.ORGANISER, open ? '1' : '0');
  }

  public getIsOrganiser(): boolean {
    return localStorage.getItem(this.ORGANISER) === '1' ? true : false;
  }

  public setPerformAdminCheck(open: boolean): any {
    localStorage.setItem(this.PERFORM_ADMIN_CHECK, open ? '1' : '0');
  }

  public getPerformAdminCheck(): boolean {
    return localStorage.getItem(this.PERFORM_ADMIN_CHECK) === '1' ? true : false;
  }

  public setGuestUuid(uuid: string): any {
    localStorage.setItem(this.GUEST_UUID, uuid);
  }

  public getGuestUuid(): string {
    return localStorage.getItem(this.GUEST_UUID);
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) {
    if (!config.authConfig) {
      throw new Error('AuthService requires authConfig to be configured via the APP_CONFIG provider');
    }

    this.authStateChange$ = new BehaviorSubject(this.securityContext);
  }

  currentUser<TUser>(): TUser {
    if (!this.user) {
      this.user = this.getStoredUser();
    }
    return this.user;
  }

  login<TUser>(request: AuthenticationRequest): Observable<IAuthenticationResponse> {
    const url = `${this.config.apiUrl}${this.config.authConfig.authTokenUrl}`;
    return this.http
      .post<IAuthenticationResponse>(url, request)
      .pipe(switchMap(res => {

        this.saveToken(res.token);

        const user = new User();
        user.email = res.email;
        user.username = res.username;
        user.uuid = res.uuid;
        this.setUser(res);
        this.authStateChange$.next(this.securityContext);
        return of(res);
      }));
  }

  forgottenPassword(request: Email): Observable<boolean> {
    const url = `${this.config.apiUrl}users/forgotten-password`;
    return this.http.post<boolean>(url, request);
  }

  requestOrganiser(request: RequestOrganiser): Observable<boolean> {
    const url = `${this.config.apiUrl}request-organiser/edit`;
    return this.http.post<boolean>(url, request);
  }

  resetPassword(request: PasswordReset): Observable<boolean> {
    const url = `${this.config.apiUrl}users/reset-password`;
    return this.http.post<boolean>(url, request);
  }

  securityCheck(router?: Router): any {
    if (!this.securityContext.authenticated) {
      if (!!router) {
        router.navigateByUrl('/security/login');
      }

      return;
    }

    this.securityCheckRequest().subscribe(test => { }, err => {
      if ((err.status === 401 || err.status === 0)) {
        this.logout();
        if (!!router) {
          router.navigateByUrl('/security/login');
        }
      }
    });
  }

  securityCheckRequest(): Observable<any> {
    const url = `${this.config.apiUrl}users/check`;
    return this.http
      .get<any>(url)
      .pipe(switchMap(res => {
        return of(res);
      }));
  }

  register<TUser>(request: SignUpRequest): Observable<any> {
    const url = `${this.config.apiUrl}users/register`;
    return this.http
      .post<any>(url, request)
      .pipe(switchMap(res => {
        return of(res);
      }));
  }

  updateUser<TUser>(): TUser {
    if (!this.user) {
      this.user = this.getStoredUser();
    }

    this.setUser(this.user);
    this.authStateChange$.next(this.securityContext);
    return this.user;
  }

  logout(removeDataOnly: boolean = false): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.CHARGES_ENABLED);
    }

    if (!removeDataOnly) {
      this.authStateChange$.next(this.securityContext);
    }
    location.reload();
  }

  getAuthHeader(): string {
    return isPlatformBrowser(this.platformId)
      ? `${localStorage.getItem(this.AUTH_TOKEN_KEY)}`
      : '';
  }

  latestEmail(): string {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(this.EMAIL_KEY)
      : '';
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  private setUser(user: User): void {
    this.user = user;
    this.setStoredUser(user);
  }

  private setRememberedUser(request: AuthenticationRequest): void {
    localStorage.setItem(this.EMAIL_KEY, request.email);
  }

  private setStoredUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getStoredUser(): User {
    return isPlatformBrowser(this.platformId)
      ? JSON.parse(localStorage.getItem(this.USER_KEY))
      : null;
  }
}
