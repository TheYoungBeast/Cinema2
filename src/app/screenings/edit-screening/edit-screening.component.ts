import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Screening } from 'src/app/interface/screening';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/DataService/data-service.service';
import { AvailableRoomsService } from 'src/app/services/AvailableRooms/available-rooms.service';


@Component({
  selector: 'app-edit-screening',
  templateUrl: './edit-screening.component.html',
  styleUrls: ['./edit-screening.component.css']
})
export class EditScreeningComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('date', {static: true}) dateInput: FormControl = {} as FormControl;
  @ViewChild('hours', {static: true}) hoursInput: FormControl = {} as FormControl;
  @ViewChild('movieId', {static: true}) movieIdSelect: FormControl = {} as FormControl;

  private id: number = 0;
  private sub: any;
  screening: Screening = {} as Screening;
  cinemaData: CinemaData = {} as CinemaData;

  private _selectedDate: Date = new Date();
  private movieId: number = -1;
  today: Date = new Date();

  constructor(private cinemaDataService: DataService, private route: ActivatedRoute, private router: Router, private _availableRoomsService: AvailableRoomsService) { }

  get availableRooms(): AvailableRoomsService {
    return this._availableRoomsService;
  }

  get selectedDate() : Date {
    return this._selectedDate;
  }

  get selectedMovieId() : number {
    return this.movieId;
  }

  ngOnInit(): void {
      this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })
    this.cinemaDataService.getData().subscribe( data => {
      if(!data.screenings)
        return;
      this.cinemaData = data;
      this.screening = this.cinemaData.screenings[this.id];
     // this.movieId = this.cinemaData.screenings[this.id].movieId;
    });
  }


  ngAfterViewInit(): void {
    this.dateInput.valueChanges.subscribe( d => {
      let date = new Date(this._selectedDate.getTime());
      this._selectedDate = new Date(d);

      if(isNaN(date.getTime())) return;

      this._selectedDate.setHours(date.getHours());
      this._selectedDate.setMinutes(date.getMinutes());
      this._selectedDate.setSeconds(date.getSeconds());
      this._selectedDate.setMilliseconds(0);
    });

    this.hoursInput.valueChanges.subscribe( h => {
      if(!h) return;
      this.selectedDate.setHours(parseInt(h.split(':')[0]));
      this.selectedDate.setMinutes(parseInt(h.split(':')[1]));
      this.selectedDate.setSeconds(0);
      this.selectedDate.setMilliseconds(0);
    });

    this.movieIdSelect.valueChanges.subscribe( id => {
      if(!isNaN(id)) this.movieId = id });
  }

  verifyForm(form: NgForm): void {
    if(form.valid) {
      let screening: Screening = form.value;
      screening.date = new Date(form.value.date);
      screening.date.setHours(parseInt(form.value.hours.split(':')[0]))
      screening.date.setMinutes(parseInt(form.value.hours.split(':')[1]));
      screening.date.setSeconds(0);
      screening.date.setMilliseconds(0);

      if(this.cinemaData.screenings[this.id].occupation == null)
        screening.occupation = [];
      else
        screening.occupation = this.cinemaData.screenings[this.id].occupation;
        
      this.cinemaDataService.editScreening(this.id, screening);
      this.router.navigate(['screenings']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
