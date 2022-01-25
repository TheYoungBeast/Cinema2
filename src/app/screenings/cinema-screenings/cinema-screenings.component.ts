import { Component, OnInit } from '@angular/core';
import CinemaData from 'src/app/data/cinemaData';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-cinema-screenings',
  templateUrl: './cinema-screenings.component.html',
  styleUrls: ['./cinema-screenings.component.css', 
  '../../css/ModernTable.css',
  '../../css/ScreeningDetails.css',
  '../../css/FancyButtons.css' ]
})
export class CinemaScreeningsComponent implements OnInit {
  data: CinemaData = {} as CinemaData;

  constructor(private cinemaDataService: DataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => { 
      this.data = data;
      console.log(data);
    });
  }
}
