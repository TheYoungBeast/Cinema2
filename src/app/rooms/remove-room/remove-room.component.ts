import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Room from 'src/app/data/room';
import Screening from 'src/app/data/screening';

import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-remove-room',
  templateUrl: './remove-room.component.html',
  styleUrls: ['./remove-room.component.css',
  '../../css/ScreeningDetails.css',
  '../../css/FancyButtons.css']
})
export class RemoveRoomComponent implements OnInit, OnDestroy {
  room: Room = {} as Room;
  screenings: Screening[] = [] as Screening[];
  id: number = 0;
  private sub: any;
  removeDenied: boolean = false;

  constructor(private route: ActivatedRoute, private cinemaDataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.cinemaDataService.getData().subscribe( data => {
      if(data.rooms) this.room = data.rooms[this.id]
      if(data.screenings) this.screenings = data.screenings;
    });
  }

  removeRoom() {
    this.removeDenied = this.screenings.some(screening => screening.roomId === this.id);
    if(!this.removeDenied) {
      this.cinemaDataService.deleteRoom(this.id);
      this.router.navigate(['rooms']);
    }
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
