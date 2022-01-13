import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interface/movie';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css', '../../css/ScreeningDetails.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: Movie = {} as Movie;
  id: number = 0;
  private sub: any;

  constructor(private route: ActivatedRoute, private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    });

    this.cinemaDataService.getMovie(this.id).subscribe( movie => {
      this.movie = movie;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
