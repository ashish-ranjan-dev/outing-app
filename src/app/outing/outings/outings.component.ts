import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../../services/user-profile.service";

@Component({
  selector: 'app-outings',
  templateUrl: './outings.component.html',
  styleUrls: ['./outings.component.scss']
})
export class OutingsComponent implements OnInit {

  constructor(private userProfileService: UserProfileService) {
  }

  ngOnInit() {
   
    this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
      console.log(userProfileResponse);
      this.userProfileService.setUserProfile(userProfileResponse.body);
    });
  }
}
