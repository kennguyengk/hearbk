import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenerhomeComponent } from './listenerhome.component';

describe('ListenerhomeComponent', () => {
  let component: ListenerhomeComponent;
  let fixture: ComponentFixture<ListenerhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenerhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
