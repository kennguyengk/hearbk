import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLoverComponent } from './signup-lover.component';

describe('SignupLoverComponent', () => {
  let component: SignupLoverComponent;
  let fixture: ComponentFixture<SignupLoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupLoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
