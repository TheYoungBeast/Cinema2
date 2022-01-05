export interface Movie {
    title: string,
    duration: number,
    description: string,
    image: string,
    trailer: string
}

export interface Room {
    roomNumber: string,
    capacity: number
}

export interface Screening {
    movieId: number,
    roomId: number,
    date: string,
    hours: string,
    occupation: Array<number>
}

export interface CinemaData {
    movies: Array<Movie>,
    rooms: Array<Room>,
    screenings: Array<Screening>
}