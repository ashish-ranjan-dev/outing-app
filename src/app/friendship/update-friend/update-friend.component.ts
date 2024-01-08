import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FriendshipService } from 'src/app/services/friendship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-friend',
  templateUrl: './update-friend.component.html',
  styleUrls: ['./update-friend.component.scss']
})
export class UpdateFriendComponent {
  email: string= "";
  friendshipId: string = '';

   constructor(private router: Router, private dialogRef: DynamicDialogRef,private friendshipService: FriendshipService, public ref: DynamicDialogRef, public config: DynamicDialogConfig){}

   ngOnInit(): void {
    this.friendshipId = this.config.data.friendshipId;
  }

  updatefriend(email:string){
    this.friendshipService.updateFriendDetails(email, this.friendshipId).subscribe(
      (Response)=>{
        this.dialogRef.close();
        this.router.navigate(['friendship', 'sent-requests']);
      },
      (error)=>{
        this.dialogRef.close();
        console.error('Error updating details', error);
      }
    )
  }

}
