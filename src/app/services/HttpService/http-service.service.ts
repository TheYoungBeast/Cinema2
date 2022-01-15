import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Movie } from 'src/app/interface/movie';
import { Room } from 'src/app/interface/room';
import { Screening } from 'src/app/interface/screening';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private baseUrl: string = 'http://localhost:7777/';
  private baseHttpOptions: Object = { headers: new HttpHeaders({'Content-Type':  'application/json' }) };

  constructor(private http: HttpClient) { };

  fetchAllData(): Observable< CinemaData > {
    return this.http.get< CinemaData >(this.baseUrl, { responseType: 'json' })
    .pipe( catchError(this.handleError<CinemaData>('fetchAllData', <CinemaData>{})) )
  }

  addMovie(movie: Movie): Observable< Movie > {
    const url = this.baseUrl + 'add/movie';
    return this.http.post< Movie >(url, movie, this.baseHttpOptions)
    .pipe( catchError(this.handleError<Movie>('AddMovie', movie)) );
  }

  addRoom(room: Room): Observable< Room > {
    const url = this.baseUrl + 'add/room';
    return this.http.post< Room >(url, room, this.baseHttpOptions)
    .pipe( catchError(this.handleError<Room>('addRoom', room)) );
  }

  addScreening(screening: Screening): Observable< Screening > {
    const url = this.baseUrl + 'add/screening';
    return this.http.post< Screening >(url, screening, this.baseHttpOptions)
    .pipe( catchError(this.handleError<Screening>('addScreening', screening)) );
  }

  editMovie(index: number, movie: Movie): Observable< Movie > {
    const url = this.baseUrl + `update/movie/${index}`;
    return this.http.put< Movie >(url, movie, this.baseHttpOptions)
    .pipe( catchError(this.handleError<Movie>('editMovie', movie)) );
  }

  editRoom(index: number, room: Room): Observable< Room > {
    const url = this.baseUrl + `update/room/${index}`;
    return this.http.put< Room >(url, room, this.baseHttpOptions)
    .pipe( catchError(this.handleError<Room>('editRoom', room)) );
  }

  editScreening(index: number, screening: Screening): Observable< Screening > {
    const url = this.baseUrl + `update/screening/${index}`;
    return this.http.put< Screening >(url, screening, this.baseHttpOptions)
    .pipe( catchError(this.handleError<Screening>('editScreening', screening)) );
  }

  deleteMovie(index: number): Observable< number > {
    const url = this.baseUrl + `/delete/movies/${index}`;
    return this.http.delete< number >(url)
    .pipe( catchError(this.handleError('deleteMovie', index)) );
  }

  deleteRoom(index: number): Observable< number > {
    const url = this.baseUrl + `/delete/rooms/${index}`;
    return this.http.delete< number >(url)
    .pipe( catchError(this.handleError('deleteRoom', index)) );
  }

  deleteScreening(index: number): Observable< number > {
    const url = this.baseUrl + `/delete/screenings/${index}`;
    return this.http.delete< number >(url)
    .pipe( catchError(this.handleError('deleteScreening', index)) );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
}
