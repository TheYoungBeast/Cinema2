import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Screening } from 'src/app/DataInterface';
import { CinemaDataService } from 'src/app/services/cinema-data.service';

@Component({
  selector: 'app-screening-details',
  templateUrl: './screening-details.component.html',
  styleUrls: ['./screening-details.component.css']
})
export class ScreeningDetailsComponent implements OnInit, OnDestroy {
  screening: Screening = {} as Screening;
  private id: number = 0;
  private sub: any;

  constructor(private cinemaDataService: CinemaDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params['id'];
    })

    this.cinemaDataService.getScreening(this.id).subscribe( scrn => {
      this.screening = scrn;
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
