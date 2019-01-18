import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioProsComponent } from './radio-pros.component';

describe('RadioProsComponent', () => {
  let component: RadioProsComponent;
  let fixture: ComponentFixture<RadioProsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioProsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioProsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
