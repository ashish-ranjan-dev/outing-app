import { Component } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship.service';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { FrozenColumn } from 'primeng/table';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ReceivedRequestsComponent {
  userId!: string ;
  layout: string = 'list';
  loading: boolean = true; // Track loading state

  receivedRequests: FriendshipDTO[] = [];
  

  constructor(private router : Router,private messageService: MessageService,private confirmationService: ConfirmationService,private friendshipService : FriendshipService, private userProfileService:UserProfileService){

  }

  layoutOptions = [
    { name: 'List', icon: 'pi pi-bars', layout: 'list' },
    { name: 'Grid', icon: 'pi pi-th-large', layout: 'grid' }
  ];

  ngOnInit(){
    setTimeout(() => {
      this.loadFriends();
      this.loading = false; // Set loading to false after data is loaded
    }, 900);
  
   this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
    this.userId = userProfileResponse.body.id;
    this.userProfileService.setUserProfile(userProfileResponse.body);
  });
 
  }



  loadFriends() {
   this.friendshipService.receivedRequests().subscribe(
     (response:any) => {
       this.receivedRequests = response.body;
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
