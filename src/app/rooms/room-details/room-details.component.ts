import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import Room from 'src/app/data/room';

import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css', 
  '../../css/ScreeningDetails.css',
  '../../css/FancyButtons.css' ]
})
export class RoomDetailsComponent implements OnInit, OnDestroy {
  private sub: any;
  private id: number = 0;
  room: Room = {} as Room;

  rows: number = 0;
  seatsPerRow: number = 0;

  constructor(private route: ActivatedRoute, private cinemaDataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getData().subscribe( data => {
      if(!data.rooms || !data.rooms[this.id]) return;

      this.room = data.rooms[this.id]
      console.log(this.id, data.rooms, this.room);

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
    });

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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
