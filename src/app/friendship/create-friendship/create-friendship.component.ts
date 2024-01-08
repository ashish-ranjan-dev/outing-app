import { Component,  EventEmitter, Output, Inject} from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship.service';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserProfileService } from 'src/app/services/user-profile.service';
@Component({
  selector: 'app-create-friendship',
  templateUrl: './create-friendship.component.html',
  styleUrls: ['./create-friendship.component.scss']
})
export class CreateFriendshipComponent {
  email: string= "";
  name: string = "";
   
  friendshipId: string = "" ;
  friendDetails!: FriendshipDTO ;
  constructor( private userProfileService: UserProfileService, private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,private route: ActivatedRoute,private friendshipService : FriendshipService, private messageService: MessageService,private formBuilder: FormBuilder){
    
  }
  

  ngOnInit(): void {
    // this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
    //   console.log(userProfileResponse);
    //   this.userProfileService.setUserProfile(userProfileResponse.body);
    // });
   
  }

  sendInvite(email:string, name:string){
 
    if (this.email || this.name) {
      
      this.friendshipService.sendInvite(name,email).subscribe(
        (response) => {
          this.dialogRef.close();
          console.log('Invite sent successfully!', response);
        },
        (errors) => {
          this.dialogRef.close();
          console.error('Failed to send invite:', errors);
           
        }
      )
  
    } else {
       console.log('Email/Name is required')
    }
  }
}
