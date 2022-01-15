import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  private selectedDate: Date = new Date();

  private movieId: number = -1;

  private subDate: any = null;
  private subHours: any = null;
  private subMovie: any = null;

  constructor(private cinemaDataService: DataService, private route: Router) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => this.cinemaData = data );
  }

  ngAfterViewInit(): void {
    // that's some good shit, the get method returns always null
    // it works, didn;t find better workaround
    // the issue is here we subscribe everytime form changes which causes multiple subscription triggers
    // easy fix subscribe => check if already subscribing 
    

    // Do poprawy
    this.form.valueChanges?.subscribe( d => {
      let c1 = this.form.controls['date'];
      let c2 = this.form.controls['hours'];
      let c3 = this.form.controls['movieId'];
      if(c1 && c2 && c3) {
        if(!this.subDate) this.subDate = c1.valueChanges.subscribe(k => {
          this.selectedDate = new Date(k);
          this.getAvailableRooms();
        });
        if(!this.subHours) this.subHours = c2.valueChanges.subscribe(k => {
          this.selectedDate.setHours(parseInt(k.split(':')[0]));
          this.selectedDate.setMinutes(parseInt(k.split(':')[1]));
          this.selectedDate.setSeconds(0);
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
    if(isNaN(this.selectedDate.getTime()) || this.movieId < 0)
      return;

    let unavailableRooms = Array.from(new Set(this.cinemaData.screenings.filter( screening => {
      if(this.selectedDate.toDateString() == screening.date.toDateString())
      {
          let timestamp = parseInt((screening.date.getTime() / 1000).toFixed(0)) + this.cinemaData.movies[screening.movieId].duration*60;
          let newTimestamp = parseInt((this.selectedDate.getTime() / 1000).toFixed(0)) + this.cinemaData.movies[this.movieId].duration*60;

          let ScreeningEnd = new Date(timestamp * 1000).getTime();
          let ScreeningStart = screening.date.getTime();

          let newScreeningEnd = new Date(newTimestamp * 1000).getTime();
          let newScreeningStart = this.selectedDate.getTime();
          
          let isOverlapping = (newScreeningStart >= ScreeningStart && newScreeningStart <= ScreeningEnd) || (newScreeningEnd >= ScreeningStart && newScreeningEnd <= ScreeningEnd);
          
          return isOverlapping;
      }
      else return false;
    }).map( screening => screening.roomId ))).map( (x:any) => parseInt(x) ); // it returns array of strings for some reason??

    let rooms = this.cinemaData.rooms.map( (r, i) => i );
    let availableRooms = rooms.filter( (roomId) => !unavailableRooms.includes(roomId) ); 

    this.availableRooms = availableRooms;
    console.log(availableRooms, unavailableRooms);
  }

  verifyForm(form: NgForm): void {
    if(form.valid) {
      let screening: Screening = form.value;
      screening.date = new Date(form.value.date);
      screening.date.setHours(parseInt(form.value.hours.split(':')[0]))
      screening.date.setMinutes(parseInt(form.value.hours.split(':')[1]));
      screening.date.setSeconds(0);
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