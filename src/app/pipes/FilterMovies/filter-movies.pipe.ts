import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from 'src/app/interface/movie';

@Pipe({
  name: 'filterMovies'
})
export class FilterMoviesPipe implements PipeTransform {

  transform(value: Movie[], ...args: string[]): Movie[] {
    const filterValue = args[0];

    if(!filterValue) return value;

    const list = value.filter( m => m.title.toLowerCase().includes(filterValue.toLowerCase()) );
    return list;
  }
}
