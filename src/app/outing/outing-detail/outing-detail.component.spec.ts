import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutingDetailComponent } from './outing-detail.component';

describe('OutingDetailComponent', () => {
  let component: OutingDetailComponent;
  let fixture: ComponentFixture<OutingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutingDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
