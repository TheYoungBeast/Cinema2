import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/DataInterface';

import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css', '../../css/AddMovie.css']
})

export class EditMovieComponent implements OnInit, OnDestroy {
  movie: Movie = {} as Movie;
  
  private id: number = 0;
  private sub: any;


  constructor(private cinemaDataService: CinemaDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getMovie(this.id).subscribe( movie => {
      this.movie.image = movie.image;
      this.movie.trailer = movie.trailer;
      this.movie.description = movie.description;
      this.movie.title = movie.title;
      this.movie.duration = movie.duration;
    })
  }

  inputChanged(event: any): void {

    switch(event.target.id) {
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

  onSubmit(event: any) {
    event.preventDefault();
    this.cinemaDataService.editMovie(this.id, this.movie);
    this.router.navigate(['movies']);
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
