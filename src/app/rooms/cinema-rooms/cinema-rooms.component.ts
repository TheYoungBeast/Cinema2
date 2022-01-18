import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/interface/room';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-cinema-rooms',
  templateUrl: './cinema-rooms.component.html',
  styleUrls: ['./cinema-rooms.component.css', 
  '../../css/ScreeningDetails.css',
  '../../css/FancyButtons.css' ]
})
export class CinemaRoomsComponent implements OnInit {
  roomList: Array< Room > = [];

  constructor(private cinemaDataService: DataService) {}

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => this.roomList = data.rooms );
  }

}
