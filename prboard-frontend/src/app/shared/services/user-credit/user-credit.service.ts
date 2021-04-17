import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TotalUserCredit } from '../../models/auth.models';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';

@Injectable({
  providedIn: 'root'
})
export class UserCreditService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  getTotalCreditForUser(userUuid: string): Observable<TotalUserCredit> {
    const url = `${this.config.apiUrl}user-credits/total-for-user/${userUuid}`;
    return this.http.get<TotalUserCredit>(url);
  }
}
