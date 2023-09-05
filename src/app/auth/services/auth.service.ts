import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environments';

import { LoginResponse, AuthStatus, User, CheckTokenResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient)

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // Public 
  currentUser = computed(() => this._currentUser());
  authStatus = computed(() => this._authStatus());

  constructor() { 
    this.checkAuthStatus().subscribe();
  }


  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;

    return this.http.post<LoginResponse>(url, user)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(error => throwError(() => error.error.message) ),
      );
  }
  
  register(user: User): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;

    return this.http.post<LoginResponse>(url, user)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(error => throwError(() => error.error.message) ),
      );
  }


  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');
    
    if (!token) {
      this._authStatus.set(AuthStatus.noAuthenticated)
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token) ),
        catchError(() => {          
          this._authStatus.set(AuthStatus.noAuthenticated)
          return of(false)
        }),
      );
  }

  logout(): void {
    this._authStatus.set( AuthStatus.noAuthenticated );
    this._currentUser.set( null );

    localStorage.removeItem('token');
  }
}
