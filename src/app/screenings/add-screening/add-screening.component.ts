import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import CinemaData from 'src/app/data/cinemaData';
import Screening from 'src/app/data/screening';
import { AvailableRoomsService } from 'src/app/services/AvailableRooms/available-rooms.service';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.css']
})
export class AddScreeningComponent implements OnInit, AfterViewInit {
  @ViewChild('date', {static: true}) dateInput: FormControl = {} as FormControl;
  @ViewChild('hours', {static: true}) hoursInput: FormControl = {} as FormControl;
  @ViewChild('movieId', {static: true}) movieIdSelect: FormControl = {} as FormControl;

  cinemaData: CinemaData = {} as CinemaData;
  today: Date = new Date();

  private _selectedDate: Date = new Date();
  private movieId: number = -1;

  constructor(private cinemaDataService: DataService, 
    private route: Router,
    private _availableRoomsService: AvailableRoomsService) { };

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
    this.cinemaDataService.getData().subscribe( data => this.cinemaData = data );
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
  
    this.movieIdSelect.valueChanges.subscribe( id => this.movieId = id );
  }

  verifyForm(form: NgForm): void {
    if(form.valid) {
      let screening: Screening = form.value;
      screening.date = new Date(form.value.date);
      screening.date.setHours(parseInt(form.value.hours.split(':')[0]))
      screening.date.setMinutes(parseInt(form.value.hours.split(':')[1]));
      screening.date.setSeconds(0);
      screening.date.setMilliseconds(0);
      screening.occupation = [];
      this.cinemaDataService.addScreening(new Screening(parseInt(form.value.movieId), parseInt(form.value.roomId), screening.date, screening.occupation));
      this.route.navigate(['screenings']);
    }
  }
}