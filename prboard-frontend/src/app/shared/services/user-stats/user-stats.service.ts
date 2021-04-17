import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStats } from '../../models/auth.models';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  getStats(userUuid: string): Observable<UserStats> {
    const url = `${this.config.apiUrl}stats/${userUuid}`;
    return this.http.get<UserStats>(url);
  }
}
