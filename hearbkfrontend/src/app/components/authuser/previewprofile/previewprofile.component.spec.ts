import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewprofileComponent } from './previewprofile.component';

describe('PreviewprofileComponent', () => {
  let component: PreviewprofileComponent;
  let fixture: ComponentFixture<PreviewprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
