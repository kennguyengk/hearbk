import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageConnectsComponent } from './stage-connects.component';

describe('StageConnectsComponent', () => {
  let component: StageConnectsComponent;
  let fixture: ComponentFixture<StageConnectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageConnectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageConnectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
