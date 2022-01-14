import { Component, OnInit } from '@angular/core';
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
export class AddScreeningComponent implements OnInit {
  cinemaData: CinemaData = {} as CinemaData;
  today: Date = new Date();

  constructor(private cinemaDataService: DataService, private route: Router) { }

  ngOnInit(): void {
    this.cinemaDataService.getData().subscribe( data => this.cinemaData = data );
  }

  verifyForm(form: NgForm): void {
    if(form.valid) {
      let screening: Screening = form.value;
      screening.occupation = [];
      this.cinemaDataService.addScreening(screening);
      this.route.navigate(['screenings']);
      console.log(screening);
    }
  }
}
