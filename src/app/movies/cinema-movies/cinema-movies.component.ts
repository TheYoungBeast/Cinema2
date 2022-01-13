import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interface/movie';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.css','../../css/ScreeningDetails.css']
})
export class CinemaMoviesComponent implements OnInit {
  moviesList: Array< Movie > = [];

  constructor(private cinemaDataService: DataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => {
      this.moviesList = data.movies;
    })
  }

}
