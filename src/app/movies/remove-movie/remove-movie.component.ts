import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interface/movie';
import { Screening } from 'src/app/interface/screening';

import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-remove-movie',
  templateUrl: './remove-movie.component.html',
  styleUrls: ['./remove-movie.component.css',
  '../../css/ScreeningDetails.css',
  '../../css/FancyButtons.css']
})
export class RemoveMovieComponent implements OnInit, OnDestroy {
  movie: Movie = {} as Movie;
  screenings: Screening[] = [] as Screening[];
  id: number = 0;
  private sub: any;
  removeDenied: boolean = false;



  constructor(private route: ActivatedRoute, private cinemaDataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.cinemaDataService.getData().subscribe( data => {
      if(data.movies) this.movie = data.movies[this.id]
    });

    this.cinemaDataService.getData().subscribe( data => {
      if(data.screenings) this.screenings = data.screenings;
    })
  }

  removeMovie() {
    this.removeDenied = this.screenings.some(screening => screening.movieId === this.id);
    if(!this.removeDenied) {
      this.cinemaDataService.deleteMovie(this.id);
      this.router.navigate(['movies']);
    }
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
