import { Injectable } from '@angular/core';
import { CinemaData } from 'src/app/interface/cinema-data';

@Injectable({
  providedIn: 'root'
})
export class MovieRankingService {

  constructor() { }

  getRanking(cinemaData: CinemaData, dateFrom?: Date, dateTo?: Date): Array<Object> {

    if(!cinemaData.screenings || !cinemaData.movies)
      return [];

    let ranking: any = {}
    let movies = cinemaData.movies;

    if(dateFrom && dateTo) 
    {
      if(dateTo.valueOf() < dateFrom.valueOf())
        return [];

      cinemaData.screenings.forEach(screening => {
        if(screening.date.valueOf() >= dateFrom.valueOf() && screening.date.valueOf() <= dateTo.valueOf())
          ranking[movies[screening.movieId].title] = (ranking[movies[screening.movieId].title] || 0 ) + screening.occupation.length });
      
    }
    else if(dateFrom && !dateTo) 
    {
      cinemaData.screenings.forEach(screening => {
        if(screening.date.valueOf() >= dateFrom.valueOf())
          ranking[movies[screening.movieId].title] = (ranking[movies[screening.movieId].title] || 0 ) + screening.occupation.length });
    }
    else if(!dateFrom && dateTo) 
    {
      cinemaData.screenings.forEach(screening => {
        if(screening.date.valueOf() <= dateTo.valueOf())
          ranking[movies[screening.movieId].title] = (ranking[movies[screening.movieId].title] || 0 ) + screening.occupation.length });
    }
    else 
    {
        cinemaData.screenings.forEach((screening) =>
          ranking[movies[screening.movieId].title] = (ranking[movies[screening.movieId].title] || 0 ) + screening.occupation.length);
    }

    let moviesRanking = Object.keys(ranking).map(function(key) {
      return {"name": key, "value": ranking[key]}
    });

    return moviesRanking.sort((first, second) => second['value'] - first['value']);
  }

}
