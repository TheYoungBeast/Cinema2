import { Injectable } from '@angular/core';
import { CinemaData } from 'src/app/interface/cinema-data';

@Injectable({
  providedIn: 'root'
})
export class AvailableRoomsService {

  constructor() { }

  getList(cinemaData: CinemaData, reservationDate: Date, movieId: number) {
    if(!cinemaData || !cinemaData.rooms || !movieId)
      return [];
    if(isNaN(reservationDate.getTime()) || movieId < 0)
      return [];

    let unavailableRooms = Array.from(new Set(cinemaData.screenings.filter( screening => {
      if(reservationDate.toDateString() == screening.date.toDateString())
      {
          let timestamp = parseInt((screening.date.getTime() / 1000).toFixed(0)) + cinemaData.movies[screening.movieId].duration*60;
          let newTimestamp = parseInt((reservationDate.getTime() / 1000).toFixed(0)) + cinemaData.movies[movieId].duration*60;

          let ScreeningEnd = new Date(timestamp * 1000).getTime();
          let ScreeningStart = screening.date.getTime();

          let newScreeningEnd = new Date(newTimestamp * 1000).getTime();
          let newScreeningStart = reservationDate.getTime();
          
          let isOverlapping = (newScreeningStart >= ScreeningStart && newScreeningStart <= ScreeningEnd) || (newScreeningEnd >= ScreeningStart && newScreeningEnd <= ScreeningEnd);
          
          return isOverlapping;
      }
      else return false;
    }).map( screening => screening.roomId ))).map( (x:any) => parseInt(x) ); // it returns array of strings for some reason??

    let rooms = cinemaData.rooms.map( (r, i) => i );
    let availableRooms = rooms.filter( (roomId) => !unavailableRooms.includes(roomId) );
    
    return availableRooms;
  }
  
}
