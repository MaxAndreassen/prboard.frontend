import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from 'src/app/shared/models/configuration.models';
import { CreateCheckoutRequest, CreateCheckoutResponse } from '../../models/subscription.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createSession(request: CreateCheckoutRequest): Observable<CreateCheckoutResponse> {
    const url = `${this.config.apiUrl}stripe-sub/create-session`;
    return this.http.post<CreateCheckoutResponse>(url, request);
  }
}
