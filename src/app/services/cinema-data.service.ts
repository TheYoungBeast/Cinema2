import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ExampleData } from '../example-data';

import { Movie } from '../interface/movie';
import { Room } from '../interface/room';
import { Screening } from '../interface/screening';

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
  private _dataMovies: BehaviorSubject< Array<Movie> > = new BehaviorSubject( new Array() );
  private readonly moviesObservable: Observable< Array<Movie> > = this._dataMovies.asObservable();

  private _dataRooms: BehaviorSubject< Array<Room> > = new BehaviorSubject( new Array() );
  private readonly roomsObservable: Observable< Array<Room> > = this._dataRooms.asObservable();

  private _dataScreenings: BehaviorSubject< Array<Screening> > = new BehaviorSubject( new Array() );
  private readonly screeningsObservable: Observable< Array<Screening> > = this._dataScreenings.asObservable();

  constructor() {
    this._dataMovies.next( ExampleData["movies"] );
    this._dataRooms.next( ExampleData["rooms"] );
    this._dataScreenings.next( ExampleData["screenings"] );

    console.log("Service INIT");
  }

  getMovies(): Observable< Array<Movie> > {
    return this.moviesObservable;
  }

  getRooms(): Observable< Array<Room> > {
    return this.roomsObservable;
  }

  getScreenings(): Observable< Array<Screening> > {
    return this.screeningsObservable;
  }

  getMovie(index: number): Observable< Movie > {
    if(index >= this._dataMovies.getValue().length)
      throw new InvalidIndexException(`${index} is out of bounds`);

    return of(this._dataMovies.getValue()[index]);
  }

  getRoom(index: number): Observable< Room > {
    if(index >= this._dataRooms.getValue().length)
      throw new InvalidIndexException(`${index} is out of bounds`);

    return of(this._dataRooms.getValue()[index]);
  }

  getScreening(index: number): Observable< Screening > {
    if(index >= this._dataScreenings.getValue().length)
      throw new InvalidIndexException(`${index} is out of bounds`);

    return of(this._dataScreenings.getValue()[index]);
  }

  editMovie(index: number, movie: Movie): void {
    this._dataMovies.getValue()[index] = movie
    this._dataMovies.next(this._dataMovies.getValue());
  }

  addMovie(movie: Movie): void {
    this._dataMovies.getValue().push(movie);
    this._dataMovies.next(this._dataMovies.getValue());
  }
}
