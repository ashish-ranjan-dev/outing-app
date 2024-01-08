import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOutingDto } from 'src/app/models/addOutingDto';
import { OutingDto } from 'src/app/models/outingDto';
import { AuthService } from 'src/app/services/auth.service';
import { OutingService } from 'src/app/services/outing.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent {
  friendDetails:any
  selectedFriends:any;
  combinedFriends:any;
  data:any;
  outingId!:string;
  userId:string|null;
  fuserIds!:string[];
  requestBody!:AddOutingDto;
  constructor(private config:DynamicDialogConfig,private authService:AuthService,private outingService:OutingService,private dialogRef:DynamicDialogRef){
    this.data = this.config.data.data;
    console.log(this.data);
    this.outingId = this.data.id;
    this.userId = this.authService.getUserIdFromToken();
  }


  ngOnInit(){
    this.loadFriends();
  }
  loadFriends(){
    this.outingService.getFriends(this.outingId,this.userId).subscribe((response:any)=>{
      this.friendDetails = response.body;
      console.log(this.friendDetails);
      
    },
    (error)=>{
      console.log(error);
      
    })
  }

  onMultiselectChange(){
    console.log(this.selectedFriends);
    
    if (this.selectedFriends.length === 0) {
    } else {
      this.combinedFriends = [...this.selectedFriends];

      // this.combinedFriends.push(this.currentUserDetails);

    }
  }

  updateFriendsInOuting(){
    this.fuserIds = [];
    for(let friend of this.selectedFriends){
      this.fuserIds.push(friend.id);
    }
    this.requestBody = {
      description:this.data.description,
      date:this.data.date,
      outingName:this.data.outingName,
      userIds:this.fuserIds
    }
    // this.requestBody.userIds = this.userIds;
    this.outingService.addFriendInOuting(this.outingId,this.requestBody).subscribe((response:any)=>{
      console.log(response);
      this.dialogRef.close();
      
    },
    (error)=>{
      console.log(error);
      
    });
  }
}
