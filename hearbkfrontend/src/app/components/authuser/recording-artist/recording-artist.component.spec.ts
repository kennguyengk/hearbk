import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingArtistComponent } from './recording-artist.component';

describe('RecordingArtistComponent', () => {
  let component: RecordingArtistComponent;
  let fixture: ComponentFixture<RecordingArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
