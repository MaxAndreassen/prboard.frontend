import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEditor, SilentAccountResponse, SilentAccountRequest } from '../models/profile.models';
import { APP_CONFIG, IAppConfig } from '../../shared/models/configuration.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  updateUser(editor: UserEditor): Observable<UserEditor> {
    const url = `${this.config.apiUrl}users/edit`;
    const options = {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data')
    };

    const formData: FormData = new FormData();
    if (!!editor.uuid) {
      formData.append('uuid', editor.uuid);
    }

    if (!!editor.firstName) {
      formData.append('firstName', editor.firstName);
    }

    if (!!editor.lastName) {
      formData.append('lastName', editor.lastName);
    }

    if (!!editor.username) {
      formData.append('username', editor.username);
    }

    if (!!editor.playstationUsername) {
      formData.append('playstationUsername', editor.playstationUsername);
    }

    if (!!editor.xboxUsername) {
      formData.append('xboxUsername', editor.xboxUsername);
    }

    if (!!editor.steamUsername) {
      formData.append('steamUsername', editor.steamUsername);
    }

    if (!!editor.twitchUsername) {
      formData.append('twitchUsername', editor.twitchUsername);
    }

    if (!!editor.twitterHandle) {
      formData.append('twitterHandle', editor.twitterHandle);
    }

    if (!!editor.existingProfileUuid) {
      formData.append('existingProfileUuid', editor.existingProfileUuid);
    }

    if (!!editor.profileImage) {
      formData.append('profileImage', editor.profileImage, editor.profileImage.name);
    }

    return this.http.post<UserEditor>(url, formData, options);
  }

  getUser(uuid: string): Observable<UserEditor> {
    const url = `${this.config.apiUrl}users/${uuid}`;
    return this.http.get<UserEditor>(url);
  }

  getUserByUsername(username: string): Observable<UserEditor> {
    const url = `${this.config.apiUrl}users/username/${username}`;
    return this.http.get<UserEditor>(url);
  }

  verifyAccount(verificationUuid: string): Observable<boolean> {
    const url = `${this.config.apiUrl}users/verify/${verificationUuid}`;
    return this.http.get<boolean>(url);
  }

  resendVerifyEmail(): Observable<boolean> {
    const url = `${this.config.apiUrl}users/verify/resend`;
    return this.http.get<boolean>(url);
  }

  createSilentAccount(request: SilentAccountRequest): Observable<SilentAccountResponse> {
    const url = `${this.config.apiUrl}silent/create`;
    return this.http.post<SilentAccountResponse>(url, request);
  }
}
