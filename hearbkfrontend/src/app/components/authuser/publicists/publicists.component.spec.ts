import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicistsComponent } from './publicists.component';

describe('PublicistsComponent', () => {
  let component: PublicistsComponent;
  let fixture: ComponentFixture<PublicistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
