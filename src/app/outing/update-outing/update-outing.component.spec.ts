import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOutingComponent } from './update-outing.component';

describe('UpdateOutingComponent', () => {
  let component: UpdateOutingComponent;
  let fixture: ComponentFixture<UpdateOutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
