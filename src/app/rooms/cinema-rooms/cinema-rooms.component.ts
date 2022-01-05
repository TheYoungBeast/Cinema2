import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/DataInterface';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-cinema-rooms',
  templateUrl: './cinema-rooms.component.html',
  styleUrls: ['./cinema-rooms.component.css']
})
export class CinemaRoomsComponent implements OnInit {
  roomList: Array< Room > = [];

  constructor(private cinemaDataService: CinemaDataService) {}

  ngOnInit(): void {
    this.cinemaDataService.getRooms().subscribe( (rooms) => {
      this.roomList = rooms;
    })
  }

}
