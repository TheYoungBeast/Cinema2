import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    httpSerivce.fetchAllData().subscribe( data => {
      this.serviceData.next(data);
    }, error => console.log(error) );
  }

  getData(): Observable< CinemaData > {
    return this.dataObservable;
  }

  addMovie(movie: Movie): void {
    this.httpSerivce.addMovie(movie).subscribe( data => {
      this.serviceData.getValue().movies.push(movie);
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  addRoom(room: Room): void {
    this.httpSerivce.addRoom(room).subscribe( data => {
      this.serviceData.getValue().rooms.push(room);
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  addScreening(screening: Screening): void {
    this.httpSerivce.addScreening(screening).subscribe( data => {
      this.serviceData.getValue().screenings.push(screening);
      this.serviceData.next(this.serviceData.getValue());
    })
  }

  editMovie(id: number, movie: Movie) {
    this.httpSerivce.editMovie(id, movie).subscribe( data => {
      this.serviceData.getValue().movies[id] = movie;
      this.serviceData.next(this.serviceData.getValue());
    })
  }
}
