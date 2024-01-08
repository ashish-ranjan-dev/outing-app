import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutingComponent } from './create-outing.component';

describe('CreateOutingComponent', () => {
  let component: CreateOutingComponent;
  let fixture: ComponentFixture<CreateOutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
