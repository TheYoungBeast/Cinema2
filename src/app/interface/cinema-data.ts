import { Movie } from "./movie";
import { Room } from "./room";
import { Screening } from "./screening";

export interface CinemaData {
    movies: Array<Movie>,
    rooms: Array<Room>,
    screenings: Array<Screening>
}