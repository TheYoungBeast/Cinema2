import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CinemaData } from 'src/app/interface/cinema-data';
import { DataService } from 'src/app/services/DataService/data-service.service';
import { MovieRankingService } from 'src/app/services/MovieRanking/movie-ranking.service';

@Component({
  selector: 'app-trending-screenings',
  templateUrl: './trending-screenings.component.html',
  styleUrls: ['./trending-screenings.component.css', '../../css/ScreeningDetails.css']
})
export class TrendingScreeningsComponent implements OnInit {
  cinemaData: CinemaData = <CinemaData>{};
  results: Object = {};

  view: [any, any] = [900, undefined];
  animations: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  Position: LegendPosition = LegendPosition.Below;
  explodeSlices: boolean = false;
  maxLabelLength: number = 45;
  label: string = "Total tickets"

  constructor(public movieRanking: MovieRankingService, private data: DataService) {
  }

  ngOnInit(): void {
    this.data.getData().subscribe( d => {
      this.cinemaData = d 

      if(this.cinemaData)
        this.results = this.movieRanking.getRanking(this.cinemaData);
    });
  }

}
