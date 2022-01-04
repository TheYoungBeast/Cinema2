import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingScreeningsComponent } from './trending-screenings.component';

describe('TrendingScreeningsComponent', () => {
  let component: TrendingScreeningsComponent;
  let fixture: ComponentFixture<TrendingScreeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingScreeningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingScreeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
