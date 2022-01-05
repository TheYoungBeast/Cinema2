import { Component, OnInit } from '@angular/core';
import { CinemaDataService } from 'src/app/services/cinema-data.service';
import { Screening } from 'src/app/DataInterface';

@Component({
  selector: 'app-cinema-screenings',
  templateUrl: './cinema-screenings.component.html',
  styleUrls: ['./cinema-screenings.component.css']
})
export class CinemaScreeningsComponent implements OnInit {
  screeningList: Array< Screening > = [];

  constructor(private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getScreenings().subscribe( (screenings) => {
      this.screeningList = screenings;
    })
  }
}
