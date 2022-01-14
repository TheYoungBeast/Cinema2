import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interface/movie';

import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css', '../../css/ScreeningDetails.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: Movie = {} as Movie;
  id: number = 0;
  private sub: any;

  constructor(private route: ActivatedRoute, private cinemaDataService: DataService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    });

    this.cinemaDataService.getData().subscribe( data => {
      if(data.movies) this.movie = data.movies[this.id]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
