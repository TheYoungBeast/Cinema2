export default class Room {

    constructor(private _roomNumber: string, private _capacity: number) {}

    get roomNumber(): string {
       return this._roomNumber;
    }

    get capacity(): number {
        return this._capacity;
    }

    set roomNumber(roomNumber: string) {
        this._roomNumber = roomNumber.trim();
    }

    set capacity(capacity: number) {
        this._capacity = Math.abs(capacity)
    }
}