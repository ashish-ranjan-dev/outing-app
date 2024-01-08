import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutingsComponent } from './outings.component';

describe('OutingsComponent', () => {
  let component: OutingsComponent;
  let fixture: ComponentFixture<OutingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
