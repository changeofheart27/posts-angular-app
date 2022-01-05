import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'https://60dff0ba6b689e001788c858.mockapi.io';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/tokens`;
    return this.http
      .post<{ token: string; userId: string }>(url, { email, password })
      .pipe(
        tap((response) => {
          console.log('LoginService: Logged in!');
          alert("Logged in sucessful!");
          this._isLoggedIn$.next(true);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log('LoginService: Logged out!');
    alert('Logged out sucessful!');
    this.router.navigate(['/home']);
  }

  getUserInfo(): Observable<any> {
    const userId = Number(localStorage.getItem('userId'));
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http
      .get<{ createdAt: string, name: string, id: string}>(url)
      .pipe(
        tap(response => {
          console.log('LoginService: Get Profile!')
          console.log(response);
        })
      );
  }
}
