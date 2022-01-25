export default class Movie {
    constructor(private _title: string, private _duration: number, 
        private _description: string, private _image: string, private _trailer: string) {}

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get duration(): number {
        return this._duration;
    }

    get image(): string {
        return this._image;
    }

    get trailer(): string {
        return this._trailer;
    }

    set title(title: string) {
        this._title = title.trim();
    }

    set duration(duration: number) {
        this._duration = Math.abs(duration);
    }

    set description(description: string) {
        this._description = description.trim();
    }

    set image(image: string) {
        this._image = image.trim();
    }

    set trailer(trailer: string) {
        this._trailer = trailer.trim();
    }
}