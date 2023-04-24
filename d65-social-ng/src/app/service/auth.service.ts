import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from 'rxjs';
import { D65Response } from '../interface/d65-response';
import { LoginRequest } from '../interface/login-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiURL = "http://localhost:5000/api/v1/auth";

  constructor(private http: HttpClient) { }

  login$ = (login: LoginRequest) => <Observable<D65Response>>this.http.post<D65Response>(`${this.apiURL}/login`, login)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error("Error occured while authenticatig user."));    
  }
}
