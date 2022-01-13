import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Room } from 'src/app/interface/room';

import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css', '../../css/ScreeningDetails.css']
})
export class RoomDetailsComponent implements OnInit, OnDestroy {
  private sub: any;
  private id: number = 0;
  room: Room = {} as Room;

  constructor(private route: ActivatedRoute, private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getRoom(this.id).subscribe( room => {
      this.room = room;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
