import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Screening } from 'src/app/interface/screening';
import { DataService } from 'src/app/services/DataService/data-service.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.css']
})
export class AddScreeningComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f', {static: true}) form: NgForm = {} as NgForm;

  cinemaData: CinemaData = {} as CinemaData;
  availableRooms: number[] = [];
  today: Date = new Date();

  private selectedDate: string = "";
  private selectedHours: string = "";

  private movieId: number = -1;

  private subDate: any = null;
  private subHours: any = null;
  private subMovie: any = null;

  constructor(private cinemaDataService: DataService, private route: Router) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => this.cinemaData = data );
    console.log(this.today.toISOString());
  }

  ngAfterViewInit(): void {
    // that's some good shit, the get method returns always null
    // it works, didn;t find better workaround
    // the issue is here we subscribe everytime form changes which causes multiple subscription triggers
    // easy fix subscribe => check if already subscribing 
    
    this.form.valueChanges?.subscribe( d => {
      let c1 = this.form.controls['date'];
      let c2 = this.form.controls['hours'];
      let c3 = this.form.controls['movieId'];
      if(c1 && c2 && c3) {
        if(!this.subDate) this.subDate = c1.valueChanges.subscribe(k => {
          this.selectedDate = k.split('-').reverse().join('.');
          this.getAvailableRooms();
        });
        if(!this.subHours) this.subHours = c2.valueChanges.subscribe(k => {
          this.selectedHours = k;
          this.getAvailableRooms();
        });
        if(!this.subMovie) this.subMovie = c3.valueChanges.subscribe(k => {
          this.movieId = k;
          this.getAvailableRooms();
        });
      } 
    })
  }

  getAvailableRooms(): void {
    if(!this.selectedDate.length || !this.selectedHours.length || this.movieId < 0)
      return;

    let unavailableRooms = Array.from(new Set(this.cinemaData.screenings.filter( screening => {
      let date = screening.date;

      if(date.valueOf() === stringToDate(this.selectedDate).valueOf())
      {
          let newScreeningStart = timeStringToMinutes(this.selectedHours);
          let newScreeningEnd = newScreeningStart + this.cinemaData.movies[this.movieId].duration;
          let oldScreeningStart = timeStringToMinutes( screening.date.toTimeString() );
          let oldScreeningEnd = oldScreeningStart + this.cinemaData.movies[screening.movieId].duration;
          
          let isOverlapping = (newScreeningStart >= oldScreeningStart && newScreeningStart <= oldScreeningEnd) || (newScreeningEnd >= oldScreeningStart && newScreeningEnd <= oldScreeningEnd);
          
          return isNaN(newScreeningStart) ? false : isOverlapping;
      }
      else return false;
    }).map( screening => screening.roomId )));

    let rooms = this.cinemaData.rooms.map( (r, i) => i );
    let availableRooms = rooms.filter( (roomId) => !unavailableRooms.includes(roomId) ); 

    this.availableRooms = availableRooms;
  }

  verifyForm(form: NgForm): void {
    if(form.valid) {
      let screening: Screening = form.value;
      screening.occupation = [];
      this.cinemaDataService.addScreening(screening);
      this.route.navigate(['screenings']);
    }
  }

  ngOnDestroy(): void {
      this.subDate.unsubscribe();
      this.subHours.unsubscribe();
  }
}

const stringToDate = (string: string) => {
  let date = new Date();
  date.setFullYear(parseInt(string.slice(-4)), parseInt(string.slice(3, 5))-1, parseInt(string.slice(0, 2)));
  date.setHours(0, 0, 0, 0);
  return date;
}

const timeStringToMinutes = (time: string) => {
  var hoursMinutes = time.split(/[.:]/);
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours*60 + minutes;
}