import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFriendshipComponent } from './create-friendship.component';

describe('CreateFriendshipComponent', () => {
  let component: CreateFriendshipComponent;
  let fixture: ComponentFixture<CreateFriendshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFriendshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFriendshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
