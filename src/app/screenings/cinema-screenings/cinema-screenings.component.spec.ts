import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaScreeningsComponent } from './cinema-screenings.component';

describe('CinemaScreeningsComponent', () => {
  let component: CinemaScreeningsComponent;
  let fixture: ComponentFixture<CinemaScreeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaScreeningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaScreeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
