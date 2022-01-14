import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Movie } from 'src/app/interface/movie';
import { Room } from 'src/app/interface/room';
import { Screening } from 'src/app/interface/screening';

import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-screening-details',
  templateUrl: './screening-details.component.html',
  styleUrls: ['./screening-details.component.css', '../../css/ScreeningDetails.css']
})

export class ScreeningDetailsComponent implements OnInit, OnDestroy {
  purchased: boolean = false;
  rows: number = 0;
  seatsPerRow: number = 0;

  private _selectedSeats: Array<number> = [];

  get selectedSeats(): Array<number> {
    return this._selectedSeats;
  }

  screening: Screening = {} as Screening;
  movie: Movie = {} as Movie;
  room: Room = {} as Room;

  private id: number = 0;
  private sub: any;

  constructor(private cinemaDataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getData().subscribe( data => {
      if(!data.screenings) return;
      this.screening = data.screenings[this.id] || null;
      this.movie = data.movies[this.screening.movieId];
      this.room = data.rooms[this.screening.roomId];

      const maxRowNo = 7;
      let bestRowNo = 0;
      let bestRestModulo = this.room.capacity % maxRowNo;

      for(let i = 4; i <= maxRowNo; i++ )
      {
          let modulo = this.room.capacity % i;
          if(modulo <= bestRestModulo)
          {
              bestRestModulo = modulo;
              bestRowNo = i;
          }
      }

      const seatsPerSide = this.room.capacity/2;
      this.seatsPerRow = Math.ceil(seatsPerSide/bestRowNo);
      this.rows = bestRowNo;
    })
  }

  onSeatSelected(event: any) {
    if(event.target.nodeName === "DIV")
    {
      if(!Array.from(event.target.classList).includes("active"))
      {
          let seatNumber = parseInt(event.target.dataset.seatNo);
          if(!seatNumber || isNaN(seatNumber))
              return;

          event.target.classList.toggle("selected");
          
          if(this.selectedSeats.includes(seatNumber)) {
            let id = this.selectedSeats.indexOf(seatNumber);
            this.selectedSeats.splice(id, 1);
          }
          else {
            this.selectedSeats.push(seatNumber);
          }
      }
    }
  }

  setSeatClass(seatNumber: number): string {
    if(this.screening.occupation.includes(seatNumber) || seatNumber > this.room.capacity)
      return 'seat active';

    return 'seat';
  }

  getSeatNumber(row: number, column: number, side: string) : number {
    let seatNumber = (row+1)+(column*this.rows);

    switch(side.toLowerCase()){
      case 'l':
        return seatNumber;
      case 'r':
        return this.rows*this.seatsPerRow + seatNumber;
      default:
        throw new Error('Unrecognized threatre side: ' + side);
    }
  }

  onBuyTickets(): void {
    if(this.selectedSeats.length)
      this.purchased = true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
