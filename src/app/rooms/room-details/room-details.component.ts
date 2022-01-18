import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Room } from 'src/app/interface/room';

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

  constructor(private route: ActivatedRoute, private cinemaDataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getData().subscribe( data => {
      if(data.rooms) this.room = data.rooms[this.id]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
