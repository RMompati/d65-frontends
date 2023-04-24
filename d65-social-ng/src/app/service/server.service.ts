import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { D65Response } from '../interface/d65-response';
import { Server } from '../interface/server';

@Injectable({ providedIn: 'root' })
export class ServerService {
  private apiUrl = "http://localhost:8080/api/v1/server";

  constructor(private http: HttpClient) { }

  servers$ = <Observable<D65Response>>this.http.get<D65Response>(`${this.apiUrl}/list`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  save$ = (server: Server) => <Observable<D65Response>>this.http.post<D65Response>(`${this.apiUrl}/save`, server)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    );

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error("Error occured while authenticatig user."));
  }
}
