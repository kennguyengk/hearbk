import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongWritersComponent } from './song-writers.component';

describe('SongWritersComponent', () => {
  let component: SongWritersComponent;
  let fixture: ComponentFixture<SongWritersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongWritersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongWritersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
