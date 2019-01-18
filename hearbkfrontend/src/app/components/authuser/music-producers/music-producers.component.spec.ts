import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicProducersComponent } from './music-producers.component';

describe('MusicProducersComponent', () => {
  let component: MusicProducersComponent;
  let fixture: ComponentFixture<MusicProducersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicProducersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
