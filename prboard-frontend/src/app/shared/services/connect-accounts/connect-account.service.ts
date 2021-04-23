import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { GitAccount, GitRepo } from '../../models/git-account.models';

@Injectable({
  providedIn: 'root'
})
export class ConnectAccountService {
  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  connectGitHub(code: string): Observable<boolean> {
    const url = `${this.config.apiUrl}connect/github/${code}`;
    return this.http.get<boolean>(url);
  }

  listAccounts(): Observable<GitAccount[]> {
    const url = `${this.config.apiUrl}connect/accounts`;
    return this.http.get<GitAccount[]>(url);
  }

  listRepos(): Observable<GitRepo[]> {
    const url = `${this.config.apiUrl}connect/repos`;
    return this.http.get<GitRepo[]>(url);
  }
}
