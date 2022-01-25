export default class Screening {
    constructor(private _movieId: number, private _roomId: number, 
        private _date: Date, private _occupation: Array<number>) {}

    get movieId(): number {
        return this._movieId;
    }

    get roomId(): number {
        return this._roomId;
    }

    get date(): Date {
        return this._date;
    }

    get occupation(): Array<number> {
        return this._occupation
    }

    set movieId(movieId: number) {
        this._movieId = Math.abs(movieId);
    }

    set roomId(roomId: number) {
        this._roomId = Math.abs(roomId);
    }

    set date(date: Date) {
        this._date = date;
    }

    set occupation(occupation: Array<number>) {
        this._occupation = [... new Set(occupation)]; // removes duplicates if any
    }
}