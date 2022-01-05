import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Movie, Room, Screening, CinemaData } from '../DataInterface';
import { ExampleData } from '../example-data';

export class InvalidIndexException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidIndexException';
  }
}

@Injectable({
  providedIn: 'root'
})
export class CinemaDataService 
{
  data: CinemaData;

  constructor() {
    this.data = ExampleData as CinemaData;
  }

  getData() : Observable< CinemaData > {
    return of(this.data);
  }

  getMovies(): Observable< Array<Movie> > {
    return of(this.data.movies);
  }

  getRooms(): Observable< Array<Room> > {
    return of(this.data.rooms);
  }

  getScreenings(): Observable< Array<Screening> > {
    return of(this.data.screenings);
  }

  getMovie(index: number): Observable< Movie > {
    if(index >= this.data.movies.length)
      throw new InvalidIndexException(`${index} is out of bounds`);

    return of(this.data.movies[index]);
  }

  getRoom(index: number): Observable< Room > {
    if(index >= this.data.movies.length)
      throw new InvalidIndexException(`${index} is out of bounds`);

    return of(this.data.rooms[index]);
  }

  getScreening(index: number): Observable< Screening > {
    if(index >= this.data.movies.length)
      throw new InvalidIndexException(`${index} is out of bounds`);

    return of(this.data.screenings[index]);
  }
}
