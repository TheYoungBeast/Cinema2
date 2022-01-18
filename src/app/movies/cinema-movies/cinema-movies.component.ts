import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Movie } from 'src/app/interface/movie';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-cinema-movies',
  templateUrl: './cinema-movies.component.html',
  styleUrls: ['./cinema-movies.component.css',
  '../../css/ScreeningDetails.css', 
  '../../css/AddMovie.css',
  '../../css/FancyButtons.css']
})
export class CinemaMoviesComponent implements OnInit {
  moviesList: Array< Movie > = [];
  filterControl: FormControl = new FormControl();
  filter: string = "";

  constructor(private cinemaDataService: DataService) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => {
      this.moviesList = data.movies;
    })

    this.filterControl.valueChanges.subscribe( v => this.filter = v );
  }

}
