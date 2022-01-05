import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css', './css/index.css', './css/Menubar.css', './css/Purchase.css',
  './css/AddMovie.css', './css/CinemaScreenings.css', './css/Trending.css']
})

export class AppComponent {
  title = 'Cinema2';
}
