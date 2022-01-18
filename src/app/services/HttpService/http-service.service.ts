import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParamsOptions, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Movie } from 'src/app/interface/movie';
import { Room } from 'src/app/interface/room';
import { Screening } from 'src/app/interface/screening';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private baseUrl: string = 'http://localhost:7777/';
  private readonly baseHttpOptions = { 
    headers: new HttpHeaders({'Content-Type':  'application/json' }), 
    observe: "response" as const,
    responseType: "json" as const
   };

  constructor(private http: HttpClient) { };

  fetchAllData(): Observable<HttpResponse<CinemaData>> {
    return this.http.get<CinemaData>(this.baseUrl, this.baseHttpOptions)
    .pipe( catchError(this.handleError) )
  }

  addMovie(movie: Movie): Observable<HttpResponse<Movie>> {
    const url = this.baseUrl + 'add/movie';
    return this.http.post< Movie >(url, movie, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  addRoom(room: Room): Observable<HttpResponse<Room>> {
    const url = this.baseUrl + 'add/room';
    return this.http.post< Room >(url, room, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  addScreening(screening: Screening): Observable<HttpResponse<Screening>> {
    const url = this.baseUrl + 'add/screening';
    return this.http.post< Screening >(url, screening, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  editMovie(index: number, movie: Movie): Observable<HttpResponse<Movie>> {
    const url = this.baseUrl + `update/movie/${index}`;
    return this.http.put< Movie >(url, movie, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  editRoom(index: number, room: Room): Observable<HttpResponse<Room>> {
    const url = this.baseUrl + `update/room/${index}`;
    return this.http.put< Room >(url, room, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  editScreening(index: number, screening: Screening): Observable<HttpResponse<Screening>> {
    const url = this.baseUrl + `update/screening/${index}`;
    return this.http.put< Screening >(url, screening, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  deleteMovie(index: number): Observable<HttpResponse<Object>> {
    const url = this.baseUrl + `/delete/movies/${index}`;
    return this.http.delete(url, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  deleteRoom(index: number): Observable<HttpResponse<Object>> {
    const url = this.baseUrl + `/delete/rooms/${index}`;
    return this.http.delete< number >(url, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  deleteScreening(index: number): Observable<HttpResponse<Object>> {
    const url = this.baseUrl + `/delete/screenings/${index}`;
    return this.http.delete< number >(url, this.baseHttpOptions)
    .pipe( catchError(this.handleError) );
  }

  /*private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed - ' + error.message);
      return of(result as T);
    };
  } */

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
