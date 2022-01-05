import { Component, OnInit } from '@angular/core';
import { CinemaDataService } from 'src/app/services/cinema-data.service';
import { CinemaData } from 'src/app/DataInterface';

@Component({
  selector: 'app-cinema-screenings',
  templateUrl: './cinema-screenings.component.html',
  styleUrls: ['./cinema-screenings.component.css', '../../css/ScreeningDetails.css', '../../css/CinemaScreenings.css']
})
export class CinemaScreeningsComponent implements OnInit {
  data: CinemaData = {} as CinemaData;

  constructor(private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => this.data = data );
  }
}
