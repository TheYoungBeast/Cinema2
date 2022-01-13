import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Movie } from 'src/app/interface/movie';
import { Room } from 'src/app/interface/room';
import { Screening } from 'src/app/interface/screening';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  private baseUrl: string = 'http://localhost:7777/';
  private baseHttpOptions: Object = { headers: new HttpHeaders({'Content-Type':  'application/json' }) };

  constructor(private http: HttpClient) { };

  fetchAllData(): Observable< CinemaData > {
    return this.http.get< CinemaData >(this.baseUrl, { responseType: 'json' });
  }

  addMovie(movie: Movie): Observable< Movie > {
    const url = this.baseUrl + 'add/movie';
    return this.http.post< Movie >(url, movie, this.baseHttpOptions);
  }

  addRoom(room: Room): Observable< Room > {
    const url = this.baseUrl + 'add/room';
    return this.http.post< Room >(url, room, this.baseHttpOptions);
  }

  addScreening(screening: Screening): Observable< Screening > {
    const url = this.baseUrl + 'add/screening';
    return this.http.post< Screening >(url, screening, this.baseHttpOptions);
  }

  editMovie(index: number, movie: Movie): Observable< Movie > {
    const url = this.baseUrl + `update/movie/${index}`;
    return this.http.put< Movie >(url, movie, this.baseHttpOptions);
  }

  editRoom(index: number, room: Room): Observable< Room > {
    const url = this.baseUrl + `update/room/${index}`;
    return this.http.put< Room >(url, room, this.baseHttpOptions);
  }

  editScreening(index: number, screening: Screening): Observable< Screening > {
    const url = this.baseUrl + `update/screening/${index}`;
    return this.http.put< Screening >(url, screening, this.baseHttpOptions);
  }

  deleteMovie(index: number): Observable< number > {
    const url = this.baseUrl + `/delete/movies/${index}`;
    return this.http.delete< number >(url);
  }

  deleteRoom(index: number): Observable< number > {
    const url = this.baseUrl + `/delete/rooms/${index}`;
    return this.http.delete< number >(url);
  }

  deleteScreening(index: number): Observable< number > {
    const url = this.baseUrl + `/delete/screenings/${index}`;
    return this.http.delete< number >(url);
  }
}
