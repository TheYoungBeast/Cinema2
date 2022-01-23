import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Movie } from 'src/app/interface/movie';
import { Room } from 'src/app/interface/room';
import { Screening } from 'src/app/interface/screening';
import { HttpService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serviceData: BehaviorSubject< CinemaData > = new BehaviorSubject({} as CinemaData);
  private readonly dataObservable: Observable< CinemaData > = this.serviceData.asObservable();

  constructor(private httpSerivce: HttpService) { 
    httpSerivce.fetchAllData().subscribe( resp => {
      if(resp.status === 200) {
        if(resp.body) {
          resp.body.screenings.forEach( v => v.date = new Date(v.date) );
          this.serviceData.next(resp.body);
        }
      }
    }, error => console.log(error) );
  }

  getData(): Observable< CinemaData > {
    return this.dataObservable;
  }

  addMovie(movie: Movie): void {
    this.httpSerivce.addMovie(movie).subscribe( resp => {
      if(resp.status !== 201) return;

      this.serviceData.getValue().movies.push(movie);
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  addRoom(room: Room): void {
    this.httpSerivce.addRoom(room).subscribe( resp => {
      if(resp.status !== 201) return;

      this.serviceData.getValue().rooms.push(room);
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  addScreening(screening: Screening): void {
    this.httpSerivce.addScreening(screening).subscribe( resp => {
      if(resp.status !== 201) return;

      this.serviceData.getValue().screenings.push(screening);
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  editMovie(id: number, movie: Movie) {
    this.httpSerivce.editMovie(id, movie).subscribe( resp => {
      if(resp.status !== 200) return;

      this.serviceData.getValue().movies[id] = movie;
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  editRoom(id: number, room: Room) {
    this.httpSerivce.editRoom(id, room).subscribe( resp => {
      if(resp.status !== 200) return;

      this.serviceData.getValue().rooms[id] = room;
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  editScreening(id: number, screening: Screening) {
    this.httpSerivce.editScreening(id, screening).subscribe( resp => {
      if(resp.status !== 200) return;

      this.serviceData.getValue().screenings[id] = screening;
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  deleteMovie(id: number) {
    if(this.serviceData.getValue().screenings.filter( s => s.movieId == id ).length)
      throw Error("Unable to delete the movie. The movie is in use");

    this.httpSerivce.deleteMovie(id).subscribe( resp => {
      if(resp.status !== 204) throwError(() => new Error(resp.statusText));

      this.serviceData.getValue().movies.splice(id, 1);
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  deleteRoom(id: number) {
    if(this.serviceData.getValue().screenings.filter( r => r.roomId == id ).length)
      throw Error("Unable to delete the room. The room is in use");

    this.httpSerivce.deleteRoom(id).subscribe( resp => {
      if(resp.status !== 204) throwError(() => new Error(resp.statusText));

      this.serviceData.getValue().rooms.splice(id, 1);
      this.serviceData.next(this.serviceData.getValue());
    })
  }
}
