import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorhomeComponent } from './contributorhome.component';

describe('ContributorhomeComponent', () => {
  let component: ContributorhomeComponent;
  let fixture: ComponentFixture<ContributorhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
