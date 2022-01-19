import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentScreeningsComponent } from './current-screenings.component';

describe('CurrentScreeningsComponent', () => {
  let component: CurrentScreeningsComponent;
  let fixture: ComponentFixture<CurrentScreeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentScreeningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentScreeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
