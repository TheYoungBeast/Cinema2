export default interface Screening {
    movieId: number,
    roomId: number,
    date: string,
    hours: string,
    occupation: Array<number>
}