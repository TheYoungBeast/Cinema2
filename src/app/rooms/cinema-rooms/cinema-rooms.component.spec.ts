import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaRoomsComponent } from './cinema-rooms.component';

describe('CinemaRoomsComponent', () => {
  let component: CinemaRoomsComponent;
  let fixture: ComponentFixture<CinemaRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
