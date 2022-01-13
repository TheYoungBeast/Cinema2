import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interface/movie';

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

  verifyForm(form: NgForm): void {
    if(form.valid) {
      this.cinemaDataService.editMovie(this.id, form.value as Movie);
      this.router.navigate(['movies']);
    }
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
