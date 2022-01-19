import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayScreeningsComponent } from './today-screenings.component';

describe('TodayScreeningsComponent', () => {
  let component: TodayScreeningsComponent;
  let fixture: ComponentFixture<TodayScreeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayScreeningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayScreeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
