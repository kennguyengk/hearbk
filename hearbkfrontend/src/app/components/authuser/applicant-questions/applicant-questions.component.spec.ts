import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantQuestionsComponent } from './applicant-questions.component';

describe('ApplicantQuestionsComponent', () => {
  let component: ApplicantQuestionsComponent;
  let fixture: ComponentFixture<ApplicantQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
