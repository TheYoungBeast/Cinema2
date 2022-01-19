import { Component, OnInit } from '@angular/core';
import { CinemaData } from '../interface/cinema-data';
import { Screening } from '../interface/screening';
import { DataService } from '../services/DataService/data-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', 
  '../css/ModernTable.css',
  '../css/ScreeningDetails.css',
  '../css/FancyButtons.css' ]
})


export class HomePageComponent implements OnInit {
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
    console.log(today)
    return date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  }

}
