import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interface/movie';

import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css', '../../css/AddMovie.css']
})

export class EditMovieComponent implements OnInit, OnDestroy {
  movie: Movie = {} as Movie;
  
  private id: number = 0;
  private sub: any;


  constructor(private cinemaDataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getData().subscribe( data => this.movie = data.movies[this.id] );
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
