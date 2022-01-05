import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Movie, Room, Screening } from 'src/app/DataInterface';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-screening-details',
  templateUrl: './screening-details.component.html',
  styleUrls: ['./screening-details.component.css', '../../css/ScreeningDetails.css']
})
export class ScreeningDetailsComponent implements OnInit, OnDestroy {
  rows: number = 0;
  seatsPerRow: number = 0;

  screening: Screening = {} as Screening;
  movie: Movie = {} as Movie;
  room: Room = {} as Room;

  private id: number = 0;
  private sub: any;

  constructor(private cinemaDataService: CinemaDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getScreening(this.id).subscribe( scrn => {
      this.screening = scrn;
    })

    this.cinemaDataService.getRoom(this.screening.roomId).subscribe( rm => {
      this.room = rm;
    })

    this.cinemaDataService.getMovie(this.screening.movieId).subscribe( mv => {
      this.movie = mv;
    })


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
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
