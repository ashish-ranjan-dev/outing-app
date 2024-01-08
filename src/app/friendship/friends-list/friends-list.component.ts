import { Component } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship.service';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { MenuItem,MegaMenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateFriendshipComponent } from '../create-friendship/create-friendship.component';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/models/userProfile';
@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
  providers: [MessageService, DialogService]
})
export class FriendsListComponent {
  friendRemovedSubscription: Subscription = new Subscription();

  userId : string|undefined;
  layout: string = 'list';
  email: string= "";
  name: string = "";
  friends: FriendshipDTO[] = [];
  pattern: string = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  ref: DynamicDialogRef | undefined;
  toastMessage!: string;
  loading: boolean = true; // Track loading state

  constructor(private userProfileService:UserProfileService, private router:Router, public dialogService: DialogService,private friendshipService : FriendshipService, private messageService: MessageService,private formBuilder: FormBuilder){

  }
  items!: MenuItem[];



  layoutOptions = [
    { name: 'List', icon: 'pi pi-bars', layout: 'list' },
    { name: 'Grid', icon: 'pi pi-th-large', layout: 'grid' }
  ];

  ngOnInit(){

    // Subscribe to the friendRemovedSubject to listen for friend removals
    this.friendRemovedSubscription = this.friendshipService.friendRemovedSubject.subscribe(
      (response : FriendshipDTO) => {
        this.friends.push(response)
      }
    );

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
   this.friendshipService.getAllFriends().subscribe(
     (response:any) => {
       this.friends = response.body;
     },
     (error) => {
       console.error('Error fetching friends:', error);
     }
   );

   this.items = [
    {
        label:'Requests',
        items: [
            {
                label: 'Sent',
                icon: 'pi pi-arrow-up-right',
                command: () => {
                   console.log("Sent-Requests");
                   this.router.navigate(['friendship' , 'sent-requests']);
                }
            },
            {
                label: 'Received',
                icon: 'pi pi-arrow-down-left',
                command: () => {
                   console.log("Received-Requested")
                   this.router.navigate(['friendship' , 'received-requests']);
                }
            }
        ]
    }]
 }


 getCardHeader(friend: any): string{
   if (!friend.inviteeUser) {
     return friend.dummyUser?.name || 'Unknown User';
   } else if (friend.inviterUser.id === this.userId) {
     return friend.inviteeUser.name;
   } else {
     return friend.inviterUser.name;
   }
 }


 getContactInfo(friend: any): string {
   return friend.inviteeUser?.email || 'N/A';
 }




  loadFriend(friendshipId: string){
     this.router.navigate(['friendship','friend', friendshipId]);
  }

  show() {
    this.ref = this.dialogService.open(CreateFriendshipComponent, {
        header: 'Send Invitation',
        width: '28%',
        contentStyle: { overflow: 'auto' , "padding-bottom":"24px"},
        baseZIndex: 10000,
        maximizable: false,
        styleClass: 'custom-dialog',
        data: {
          dialogRef: this.ref // Pass the dialog reference
        }
    });


}
}
