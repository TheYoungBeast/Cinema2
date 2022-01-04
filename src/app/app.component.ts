import { Component } from '@angular/core';
import Movie from './Movie';
import Screening from './Screening';
import Room from './Room';
import { CinemaData } from './data';

interface cinema_data {
  screenings: Array<Screening>,
  movies: Array<Movie>,
  rooms: Array<Room>
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Cinema2';
  data: cinema_data;

  constructor() {
    this.data = <cinema_data>new Object;
  }

  ngOnInit(): void {
    this.data = <cinema_data> CinemaData;
  }
}
