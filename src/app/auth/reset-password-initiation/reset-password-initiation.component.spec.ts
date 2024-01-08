import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordInitiationComponent } from './reset-password-initiation.component';

describe('ResetPasswordInitiationComponent', () => {
  let component: ResetPasswordInitiationComponent;
  let fixture: ComponentFixture<ResetPasswordInitiationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordInitiationComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
