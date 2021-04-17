import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { TournamentPromoSummary } from '../../models/tournaments.models';

@Injectable({
  providedIn: 'root'
})
export class TournamentPromoService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  getPromo(uuid: string): Observable<TournamentPromoSummary> {
    const url = `${this.config.apiUrl}tournament-promos/${uuid}/summary`;
    return this.http.get<TournamentPromoSummary>(url);
  }
}
