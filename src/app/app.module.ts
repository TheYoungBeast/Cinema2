import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { CinemaRoomsComponent } from './rooms/cinema-rooms/cinema-rooms.component';
import { RemoveRoomComponent } from './rooms/remove-room/remove-room.component';
import { RoomDetailsComponent } from './rooms/room-details/room-details.component';

import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { CinemaMoviesComponent } from './movies/cinema-movies/cinema-movies.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { RemoveMovieComponent } from './movies/remove-movie/remove-movie.component';

import { AddScreeningComponent } from './screenings/add-screening/add-screening.component';
import { CinemaScreeningsComponent } from './screenings/cinema-screenings/cinema-screenings.component';
import { EditScreeningComponent } from './screenings/edit-screening/edit-screening.component';
import { ScreeningDetailsComponent } from './screenings/screening-details/screening-details.component';
import { TrendingScreeningsComponent } from './screenings/trending-screenings/trending-screenings.component';

import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PurchaseDetailsComponent } from './screenings/purchase-details/purchase-details.component';

import { NumericInputDirective } from './directives/NumericInput/numeric-input.directive';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full'},
  { path: 'rooms', component: CinemaRoomsComponent },
  { path: 'rooms/add', component: AddMovieComponent },
  { path: 'rooms/:id', component: RoomDetailsComponent },
  { path: 'rooms/:id/edit', component: EditRoomComponent },

  { path: 'movies', component: CinemaMoviesComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'movies/:id/edit', component: EditMovieComponent },

  { path: 'screenings', component: CinemaScreeningsComponent },
  { path: 'screenings/:id', component: ScreeningDetailsComponent },
  { path: 'screenings/:id/edit', component: EditScreeningComponent },
  { path: 'trending', component: TrendingScreeningsComponent },

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AddRoomComponent,
    EditRoomComponent,
    CinemaRoomsComponent,
    RemoveRoomComponent,
    RoomDetailsComponent,
    AddMovieComponent,
    CinemaMoviesComponent,
    EditMovieComponent,
    MovieDetailsComponent,
    RemoveMovieComponent,
    AddScreeningComponent,
    CinemaScreeningsComponent,
    EditScreeningComponent,
    ScreeningDetailsComponent,
    TrendingScreeningsComponent,
    HomePageComponent,
    PageNotFoundComponent,
    PurchaseDetailsComponent,
    NumericInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { /*enableTracing: true*/ })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
