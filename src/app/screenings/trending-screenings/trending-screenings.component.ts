import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CinemaData } from 'src/app/interface/cinema-data';
import { DataService } from 'src/app/services/DataService/data-service.service';
import { MovieRankingService } from 'src/app/services/MovieRanking/movie-ranking.service';

function dateRangeValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {

    if(form && form instanceof FormGroup) {
      const start: Date = new Date(form.get('start')?.value);
      const end: Date = new Date(form.get('end')?.value);

      if(start && end) {
        const isValid: boolean = (end.getTime() - start.getTime()) >= 0;

        return isValid ? null : { dateRange: true };
      }
    }

    return null;
  }
}

@Component({
  selector: 'app-trending-screenings',
  templateUrl: './trending-screenings.component.html',
  styleUrls: ['./trending-screenings.component.css', '../../css/ScreeningDetails.css']
})
export class TrendingScreeningsComponent implements OnInit {
  filterForm: FormGroup;

  
  public get start(): FormControl {
    return <FormControl>this.filterForm.get('start');
  }

  public get end(): FormControl {
    return <FormControl>this.filterForm.get('end');
  }

  cinemaData: CinemaData = <CinemaData>{};
  results: Array<Object> = [];
  today = new Date();

  private startDate: Date;
  private endDate: Date;
  
  view: [any, any] = [900, undefined];
  animations: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  Position: LegendPosition = LegendPosition.Below;
  explodeSlices: boolean = false;
  maxLabelLength: number = 45;
  label: string = "Total tickets"

  constructor(public movieRanking: MovieRankingService, private data: DataService, private datePipe: DatePipe) { 
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.startDate = this.today;
    this.endDate = new Date(this.today.getTime() + 604800*1000); // week

    this.filterForm = new FormGroup({
      start: new FormControl(datePipe.transform(this.startDate, 'yyyy-MM-dd'), Validators.required),
      end: new FormControl(datePipe.transform(this.endDate, 'yyyy-MM-dd'), Validators.required),
    }, [dateRangeValidator(), Validators.required]);
  }

  ngOnInit(): void {
    this.data.getData().subscribe( d => {
      this.cinemaData = d 

      if(this.cinemaData)
        this.results = this.movieRanking.getRanking(this.cinemaData, this.startDate, this.endDate);
    });

    this.start.valueChanges.subscribe( date => {
      if(date) {
        this.startDate = new Date(date);
        this.startDate.setHours(0);
        this.startDate.setMinutes(0);
        this.startDate.setSeconds(0);
      }
    });

    this.end.valueChanges.subscribe( date => {
      if(date) {
        this.endDate = new Date(date);
        this.endDate.setHours(0);
        this.endDate.setMinutes(0);
        this.endDate.setSeconds(0);
      }
    });
  }

  filterRanking(form: FormGroup) {
    if(form.valid) {
      this.results = this.movieRanking.getRanking(this.cinemaData, this.startDate, this.endDate);
    }
  }

}
