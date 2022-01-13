import { Component, OnInit } from '@angular/core';
import { CinemaDataService } from 'src/app/services/cinema-data.service';
import { CinemaData } from 'src/app/interface/cinema-data';

@Component({
  selector: 'app-cinema-screenings',
  templateUrl: './cinema-screenings.component.html',
  styleUrls: ['./cinema-screenings.component.css', '../../css/ScreeningDetails.css', '../../css/CinemaScreenings.css']
})
export class CinemaScreeningsComponent implements OnInit {
  data: CinemaData = {} as CinemaData;

  constructor(private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getScreenings().subscribe( data => this.data.screenings = data );
    this.cinemaDataService.getMovies().subscribe( data => this.data.movies = data );
    this.cinemaDataService.getRooms().subscribe( data => this.data.rooms = data );
  }
}
