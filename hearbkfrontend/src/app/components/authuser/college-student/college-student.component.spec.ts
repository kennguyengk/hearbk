import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeStudentComponent } from './college-student.component';

describe('CollegeStudentComponent', () => {
  let component: CollegeStudentComponent;
  let fixture: ComponentFixture<CollegeStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
