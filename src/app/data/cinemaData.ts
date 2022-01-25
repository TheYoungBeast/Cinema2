import Movie from "./movie";
import Room from "./room";
import Screening from "./screening";


export default class CinemaData {
    constructor(private _movies: Array<Movie>, private _rooms: Array<Room>, private _screenings: Array<Screening>) {}

    get movies(): Array<Movie> {
        return this._movies;
    }

    get rooms(): Array<Room> {
        return this._rooms;
    }

    get screenings(): Array<Screening> {
        return this._screenings;
    }

    set movies(movies: Array<Movie>) {
        this._movies = movies;
    }

    set rooms(rooms: Array<Room>) {
        this._rooms = rooms;
    }

    set screenings(screenings: Array<Screening>) {
        this._screenings = screenings;
    }
}