import { Component, OnInit } from '@angular/core';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Screening } from 'src/app/interface/screening';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-today-screenings',
  templateUrl: './today-screenings.component.html',
  styleUrls: ['./today-screenings.component.css', 
  '../../css/ModernTable.css',
  '../../css/ScreeningDetails.css',
  '../../css/FancyButtons.css' ]
})
export class TodayScreeningsComponent implements OnInit {
  data: CinemaData = {} as CinemaData;
  todaysScreenings: Screening[] = [] as Screening[];
  today: Date = new Date();

  constructor(private cinemaDataService: DataService) { }

   ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => {
      this.data = data;
    })

    // checks todays screenings
    this.todaysScreenings = this.data.screenings.filter(s => this.isToday(s.date))
  }

  isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  }
}

