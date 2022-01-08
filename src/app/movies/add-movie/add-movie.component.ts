import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/DataInterface';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css', '../../css/AddMovie.css']
})

export class AddMovieComponent implements OnInit {
  private movie: Movie = {} as Movie;

  constructor(private router: Router, private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
  }

  onChange(event: any): void
  {
    switch(event.target.id){
      case 'input-movie-title':
        this.movie.title = event.target.value;
        break;
      case 'input-movie-dur':
        this.movie.duration = +event.target.value;
        break;
      case 'input-movie-desc':
        this.movie.description = event.target.value;
        break;
      case 'input-movie-img':
        this.movie.image = event.target.value;
        break;
      case 'input-movie-trailer':
        this.movie.trailer = event.target.value;
        break;
      default:
        throw 'Unhandled Case: ' + event.target.id;
    }
  }

  onSubmit(event: any): void {
    event.preventDefault();
    this.cinemaDataService.addMovie(this.movie);
    this.router.navigate(['movies']);
  }

}
