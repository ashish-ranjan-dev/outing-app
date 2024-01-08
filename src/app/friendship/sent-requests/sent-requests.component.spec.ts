import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestsComponent } from './sent-requests.component';

describe('SentRequestsComponent', () => {
  let component: SentRequestsComponent;
  let fixture: ComponentFixture<SentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
