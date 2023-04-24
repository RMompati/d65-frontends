import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from 'rxjs';
import { D65Response } from '../interface/d65-response';
import { SigninRequest } from '../interface/signin-request';
import { SignupRequest } from '../interface/singup-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiURL = "http://localhost:5000/api/v1/auth";

  constructor(private http: HttpClient) { }

  signin$ = (signin: SigninRequest) => <Observable<D65Response>>this.http.post<D65Response>(`${this.apiURL}/login`, signin)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  signup$ = (signup: SignupRequest) => <Observable<D65Response>>this.http.post<D65Response>(`${this.apiURL}/signup`, signup)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  activate$ = (token: string) => <Observable<D65Response>>this.http.get<D65Response>(`${this.apiURL}/activate/${token}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error("Error occured while authenticatig user."));
  }
}
