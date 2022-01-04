import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaMoviesComponent } from './cinema-movies.component';

describe('CinemaMoviesComponent', () => {
  let component: CinemaMoviesComponent;
  let fixture: ComponentFixture<CinemaMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
