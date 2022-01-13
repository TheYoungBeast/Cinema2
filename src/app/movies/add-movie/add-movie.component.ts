import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Movie } from 'src/app/interface/movie';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css', '../../css/AddMovie.css']
})

export class AddMovieComponent implements OnInit {

  constructor(private router: Router, private cinemaDataService: CinemaDataService) { }

  ngOnInit(): void {
  }

  verifyForm(form: NgForm): void {
    if(form.valid) {
      this.cinemaDataService.addMovie(form.value as Movie);
      this.router.navigate(['movies']);
    }
  }
}
