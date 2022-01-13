import { Component, OnInit } from '@angular/core';
import { CinemaData } from 'src/app/interface/cinema-data';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-cinema-screenings',
  templateUrl: './cinema-screenings.component.html',
  styleUrls: ['./cinema-screenings.component.css', '../../css/ScreeningDetails.css', '../../css/CinemaScreenings.css']
})
export class CinemaScreeningsComponent implements OnInit {
  data: CinemaData = {} as CinemaData;

  constructor(private cinemaDataService: DataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => { 
      this.data = data;
    });
    /*this.cinemaDataService.getScreenings().subscribe( data => this.data.screenings = data );
    this.cinemaDataService.getMovies().subscribe( data => this.data.movies = data );
    this.cinemaDataService.getRooms().subscribe( data => this.data.rooms = data );*/
  }
}
