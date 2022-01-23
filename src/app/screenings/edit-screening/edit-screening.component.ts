import { Component, OnInit, OnDestroy } from '@angular/core';
import { CinemaData } from 'src/app/interface/cinema-data';
import { Screening } from 'src/app/interface/screening';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/DataService/data-service.service';
import { AvailableRoomsService } from 'src/app/services/AvailableRooms/available-rooms.service';


@Component({
  selector: 'app-edit-screening',
  templateUrl: './edit-screening.component.html',
  styleUrls: ['./edit-screening.component.css']
})
export class EditScreeningComponent implements OnInit, OnDestroy {

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
  this.cinemaDataService.getData().subscribe( data => this.cinemaData = data );
}

verifyForm(form: NgForm): void {
  if(form.valid) {
    let screening: Screening = form.value;
      screening.date = new Date(form.value.date);
      screening.date.setHours(parseInt(form.value.hours.split(':')[0]))
      screening.date.setMinutes(parseInt(form.value.hours.split(':')[1]));
      screening.date.setSeconds(0);
    this.cinemaDataService.editScreening(this.id, form.value as Screening);
    this.router.navigate(['screenings']);
  }
}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
