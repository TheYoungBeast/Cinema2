import { Component, OnInit } from '@angular/core';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-screening-details',
  templateUrl: './screening-details.component.html',
  styleUrls: ['./screening-details.component.css']
})
export class ScreeningDetailsComponent implements OnInit {

  constructor(private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
  }

}
