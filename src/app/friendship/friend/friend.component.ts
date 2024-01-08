import { Component } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship.service';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { MegaMenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, Message } from 'primeng/api';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UpdateFriendComponent } from '../update-friend/update-friend.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
  providers: [ ConfirmationService, DialogService]
})

export class FriendComponent {
  friendshipId: string = "";
  inviteeEmail: string = "";
  userId!: string;
  friendDetails!: FriendshipDTO;
  status: any;
  items: MenuItem[] = [];
  outings: any = [];
  messages: Message[] = [];
  ref: DynamicDialogRef | undefined;
  loading: boolean = true; // Track loading state

  constructor(public dialogService: DialogService,private confirmationService: ConfirmationService, private router: Router, private route: ActivatedRoute, private friendshipService: FriendshipService, private messageService: MessageService, private formBuilder: FormBuilder, private userProfileService: UserProfileService) {

  }

  showConfirmationDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.revokeFriendship(this.friendshipId);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }


  ngOnInit(): void {


      setTimeout(() => {
        this.route.paramMap.subscribe(params => {

          this.friendshipId = params.get('id')!;
          this.friendshipService.getFriendDetails(this.friendshipId).subscribe(
            (response: any) => {
              this.friendDetails = response.body;
            },
            (error) => {
              console.log('Error in finding friend', error);
              this.router.navigate(['friendship']);
            }
          )
        });
        this.loading = false; // Set loading to false after data is loaded
      }, 900);



    this.items = [
      {
        label: 'Revoke Friendship',
        icon: 'pi pi-times',
        command: () => {

          this.showConfirmationDialog();

        }
      }
    ];

    this.userProfileService.getProfileApi().subscribe((userProfileResponse: any) => {
      this.userId = userProfileResponse.body.id;
      this.userProfileService.setUserProfile(userProfileResponse.body);
    });
    this.userProfileService.getUserProfile().subscribe((userProfile: any)=>{
      this.userId=userProfile?.id;
    });

    this.messages = [
      { severity: 'error', summary: 'Rejected', detail: 'Your friend request had been rejected.' },
    ];

  }




  revokeFriendship(friendshipId: string) {
    this.friendshipService.revokeFriendship(friendshipId).subscribe(
      (Response) => {
        console.log('Friendship Removed Successfully', Response);
        this.router.navigate(['friendship'])
      },
      (error) => {
        console.error('Error in revoking Friendship', error);
      }
    )

  }



  getCardHeader(friend: any): string {
    if (!friend) {
      return '';
    }


    if (friend.inviterUser.id === this.userId) {
      // if I am inviter
      if (friend.status === "accepted" || friend.status === "invited" || friend.status === "rejected") {
        return friend.inviteeUser.name;
      }
      else if (!friend.inviteeUser) {
        return friend.dummyUser.name;
      }
    }

    if (friend.inviterUser.id !== this.userId) {
      // if i am not inviter
      if (friend.status === "accepted" || friend.status === "invited" || friend.status === "rejected") {
        return friend.inviterUser.name;
      }
    }

    return '';


  }

  getstatus(friend: FriendshipDTO): string {
    if (!friend) {
      return 'N/A';
    }

    if (friend.status === null) {
      return 'Guest User';
    }

    if (friend.status === "rejected") {
      return "Rejected"
    }

    if (friend.status === "accepted") {
      return "Accepted"
    }

    if (friend.inviterUser.id === this.userId) {

      if (friend.status === "invited") {
        return "Invitation Sent"
      }
    } else {
      if (friend.status === "invited") {
        return "Invitation Received"
      }
    }


    return 'N/A';

  }




  // Cancel Friendship
  cancelFriendship(friendshipId: string) {
    console.log(friendshipId);

    this.friendshipService.cancelFriendship(friendshipId).subscribe(
      (Response) => {

        console.log('Friendship Cancelled Successfully', Response);
        this.router.navigate(['friendship', 'sent-requests']);
      },
      (error) => {
        console.error('Error in cancelling Friendship', error);
        this.router.navigate(['friendship', 'sent-requests']);
      }
    )
  }
  confirm2(friendshipId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to cancel the friend request?',
      header: 'Cancel Friend Request',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.cancelFriendship(friendshipId);
        this.confirmationService.close();

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }


  // Accept Friendship
  confirm1(friendshipId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to accept friend request?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.acceptFriendship(friendshipId);
        this.router.navigate(['friendship', 'received-requests']);

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }

  acceptFriendship(friendshipId: string) {

    this.friendshipService.acceptFriendship(friendshipId).subscribe(
      (Response) => {
        console.log('Friendship Accepted Successfully', Response);
      },
      (error) => {
        console.error('Error in accepting Friendship', error);
      }
    )
  }


  // Reject Friendship
  rejectFriendship(friendshipId: string) {
    console.log(friendshipId);

    this.friendshipService.rejectFriendship(friendshipId).subscribe(
      (Response) => {
        console.log('Friendship Rejected Successfully', Response);
        this.router.navigate(['friendship', 'received-requests']);
      },
      (error) => {
        console.error('Error in Rejecting Friendship', error);
      }
    )
  }
  confirm3(friendshipId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to reject the friend request?',
      header: 'Reject Friend Request',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.rejectFriendship(friendshipId);
        this.confirmationService.close();

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }


  show() {
    this.ref = this.dialogService.open(UpdateFriendComponent, {
        header: 'Update Friend Details',
        width: '28%',
        contentStyle: { overflow: 'auto' , "padding-bottom":"24px"},
        baseZIndex: 10000,
        maximizable: false,
        styleClass: 'custom-dialog',
        data: {
          friendshipId: this.friendshipId,
          dialogRef: this.ref // Pass the dialog reference
        }
    });
}

backToFriends(){
  this.router.navigate(['friendship'])
}
sendInvite(email:string, name : string){
   console.log("I am from sendInvite", email);
    this.friendshipService.sendInvite(name,email).subscribe(
      (response) => {
        console.log('Invite sent successfully!', response);
      },
      (errors) => {
        console.error('Failed to send invite:', errors);
      }
    )

  }


resend(){
  this.confirmationService.confirm({
    message: 'Are you sure you want to resend the invitation?',
    header: 'Resend Request',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.inviteeEmail = this.friendDetails?.inviteeUser?.email || "";
      this.sendInvite(this.inviteeEmail, "");
      this.confirmationService.close();
      this.router.navigate(['friendship','sent-requests']);
    },
    reject: (type: ConfirmEventType) => {
      switch (type) {
        case ConfirmEventType.REJECT:
          break;
        case ConfirmEventType.CANCEL:
          break;
      }
    }
  });
}

}
