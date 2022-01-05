import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/DataInterface';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.css']
})
export class CinemaMoviesComponent implements OnInit {
  moviesList: Array< Movie > = [];

  constructor(private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getMovies().subscribe( (movies) => {
      this.moviesList = movies;
    })
  }

}
