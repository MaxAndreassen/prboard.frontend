import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountrySummary } from '../../models/country.models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listCountries(): Observable<CountrySummary[]> {
    const url = `${this.config.apiUrl}countries/list`;
    return this.http.get<CountrySummary[]>(url);
  }
}
