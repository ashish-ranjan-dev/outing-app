import { Component } from '@angular/core';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { FriendshipService } from 'src/app/services/friendship.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SentRequestsComponent {
  userId! : string;
  layout: string = 'list';
  loading: boolean = true; // Track loading state

  sentRequests: FriendshipDTO[] = [];
  

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,private friendshipService : FriendshipService, private userProfileService: UserProfileService){

  }


 
  layoutOptions = [
    { name: 'List', icon: 'pi pi-bars', layout: 'list' },
    { name: 'Grid', icon: 'pi pi-th-large', layout: 'grid' }
  ];

  ngOnInit(){
  //  this.loadFriends(); 
  setTimeout(() => {
    this.loadFriends();
    this.loading = false; // Set loading to false after data is loaded
  }, 900);

   this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
    this.userProfileService.setUserProfile(userProfileResponse.body);
  });
  this.userProfileService.getUserProfile().subscribe((userProfile: any)=>{
    this.userId=userProfile?.id;
  });
  }

  

  loadFriends() {
   this.friendshipService.sentRequests().subscribe(
     (response:any) => {
       this.sentRequests = response.body;
     },
     (error) => {
       console.error('Error fetching friends:', error);
     }
   );
 }
 loadFriend(friendshipId: string){
this.router.navigate(['friendship','friend', friendshipId]);
}

backToFriends(){
  this.router.navigate(['friendship'])
}

}
