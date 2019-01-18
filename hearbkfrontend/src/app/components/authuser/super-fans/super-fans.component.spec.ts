import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperFansComponent } from './super-fans.component';

describe('SuperFansComponent', () => {
  let component: SuperFansComponent;
  let fixture: ComponentFixture<SuperFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperFansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
