import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertGoersComponent } from './concert-goers.component';

describe('ConcertGoersComponent', () => {
  let component: ConcertGoersComponent;
  let fixture: ComponentFixture<ConcertGoersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertGoersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertGoersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
