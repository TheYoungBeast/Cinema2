import { Component, OnInit } from '@angular/core';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Screening } from 'src/app/interface/screening';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-current-screenings',
  templateUrl: './current-screenings.component.html',
  styleUrls: ['./current-screenings.component.css', 
  '../../css/ModernTable.css',
  '../../css/ScreeningDetails.css',
  '../../css/FancyButtons.css' ]
})

export class CurrentScreeningsComponent implements OnInit {
  data: CinemaData = {} as CinemaData;
  currentScreenings: Screening[] = [] as Screening[];

  constructor(private cinemaDataService: DataService) { }

   ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => {
      this.data = data;
    })

    // checks todays screenings
    this.currentScreenings = this.data.screenings.filter(s => 
      this.isCurrentlyPlaying(s.date, this.data.movies[s.movieId].duration))
  }

  isCurrentlyPlaying = (date: Date, duration: number) => {
    const today = new Date()
    const beginning: Date = new Date(date.getTime());
    const ending: Date = new Date(date.getTime());

    ending.setMinutes( ending.getMinutes() + duration);
    // console.log(`Beginning date: ${beginning}\nEnding date: ${ending}\nDuration: ${duration}\n\n`)

    return today.getTime() <= ending.getTime() && 
    today.getTime() >= beginning.getTime();
  }
}
