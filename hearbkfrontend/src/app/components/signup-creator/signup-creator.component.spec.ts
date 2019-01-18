import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCreatorComponent } from './signup-creator.component';

describe('SignupCreatorComponent', () => {
  let component: SignupCreatorComponent;
  let fixture: ComponentFixture<SignupCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
