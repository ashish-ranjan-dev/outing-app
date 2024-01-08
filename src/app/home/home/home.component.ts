import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private userProfileService: UserProfileService){

  }
  ngOnInit(): void {
    // this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
    //   console.log(userProfileResponse);
    //   this.userProfileService.setUserProfile(userProfileResponse.body);
    // });
    this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
      console.log(userProfileResponse);
      this.userProfileService.setUserProfile(userProfileResponse.body);
    });
  }
}
