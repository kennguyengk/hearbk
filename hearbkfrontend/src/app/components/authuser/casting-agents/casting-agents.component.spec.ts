import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingAgentsComponent } from './casting-agents.component';

describe('CastingAgentsComponent', () => {
  let component: CastingAgentsComponent;
  let fixture: ComponentFixture<CastingAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
