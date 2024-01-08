import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFriendComponent } from './update-friend.component';

describe('UpdateFriendComponent', () => {
  let component: UpdateFriendComponent;
  let fixture: ComponentFixture<UpdateFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
