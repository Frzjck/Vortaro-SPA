import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private tokenExp;
  errorSubject = new Subject<string>();
  successSubmitNewUser = false;
  whoAmI: string;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http.post(BACKEND_URL + '/register', authData).subscribe(
      () => {
        this.successSubmitNewUser = true;
        this.login(email, password);
        this.router.navigate(['/']);
        this.successSubmitNewUser = false;
      },
      (error) => {
        this.successSubmitNewUser = false;
        this.authStatusListener.next(false);
        this.errorSubject.next(error.error.error);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ success: boolean; token: string }>(
        BACKEND_URL + '/login',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.tokenExp =
              Date.now() + environment.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000;
            this.authStatusListener.next(true);
            this.saveAuthData(token);
            this.getMe();
            this.router.navigate(['/']);
          }
        },
        (error) => {
          let serverError = error.error.error;
          console.log(serverError);
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.whoAmI = undefined;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExp', this.tokenExp);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    this.tokenExp = localStorage.getItem('tokenExp');
    if (!token || !this.tokenExp || this.tokenExp <= Date.now()) {
      return;
    }
    return {
      token: token,
    };
  }

  // ----------- Who Am I -----------
  getMe() {
    return this.http
      .get<{ message: string; data: any }>(BACKEND_URL + '/me')
      .pipe(
        map((res: { message: string; data: any }) => {
          return res.data.email;
        })
      )
      .subscribe((dataFiltered) => {
        this.whoAmI = dataFiltered;
      });
  }
}
