import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FansQuestionsComponent } from './fans-questions.component';

describe('FansQuestionsComponent', () => {
  let component: FansQuestionsComponent;
  let fixture: ComponentFixture<FansQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FansQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FansQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
