import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOutingDetailsDto } from 'src/app/models/addOutingDetailsDto';
import { AddOutingDto } from 'src/app/models/addOutingDto';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { OutingDetailsDto } from 'src/app/models/outingDetailsDto';
import { OutingDto } from 'src/app/models/outingDto';
import { AuthService } from 'src/app/services/auth.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { OutingService } from 'src/app/services/outing.service';

@Component({
  selector: 'app-update-outing',
  templateUrl: './update-outing.component.html',
  styleUrls: ['./update-outing.component.scss']
})
export class UpdateOutingComponent {
  data:any;
  currentOutingId!:string
  description!:string
  defaultDate:any;
  defaultDate1!:any;
  outingName!:string
  friends!:FriendshipDTO[]
  outingDetails1!:OutingDetailsDto[];
  outingDetails!:string[];
  responseOuting!:OutingDto;
  responseOutingDetails:OutingDetailsDto[]=[];
  userId:string|null;
  selectedFriends!: any[];
  currentUserDetails!: OutingDetailsDto;
  currentUserDetails1!: OutingDetailsDto;
  currentUserShare: number = 0;
  currentUserPaid: number = 0;
  combinedFriends!: OutingDetailsDto[];
  isMultiselectNotEmpty: boolean = false;
  outing!:AddOutingDto;
  currentUser: any;
  creatorId!:any;
  friendDetails!:OutingDto[];
  currentStatus!:string
  

  constructor(private config:DynamicDialogConfig,private datePipe:DatePipe,private friendshipService:FriendshipService,private dialogRef:DynamicDialogRef,private authService:AuthService,private outingService:OutingService){
    this.userId = this.authService.getUserIdFromToken();
    this.data = this.config.data.data;
    console.log(this.config);
    
    this.currentOutingId = this.data.id;
    this.description = this.data.description;
    this.defaultDate = this.data.date;
    const date = new Date(this.defaultDate);
    this.defaultDate = date;
    this.defaultDate1 = this.datePipe.transform(this.defaultDate, 'dd MMM yyyy HH:mm');
    this.outingName = this.data.outingName;
    this.creatorId = this.data.creatorId;
    this.currentStatus = this.data.status;
    // this.outingDetails = this.data.userIds;
    console.log((this.data));
  }

  ngOnInit(){
    this.loadFriends();
  }


  loadFriends(){
    this.friendshipService.getAllFriends().subscribe(
      (response: any) => {
        console.log(response);
        this.friends = response.body;
        this.outingDetails1 = [];
        if (this.friends.length > 0) {
          this.currentUser = this.friends[0].inviteeUser?.id == this.userId ? this.friends[0].inviteeUser : this.friends[0].inviterUser;
          this.currentUserDetails = {
            id:"0",
            outingId:this.currentOutingId,
            user:{
              id:this.currentUser?.id,
              name:this.currentUser?.name,
              email:this.currentUser?.email
            },
            status :this.currentStatus
          };
        }
        for (let friend of this.friends) {
          if (friend.dummyUser == null && friend.inviterUser.id == this.userId) {

            this.outingDetails1.push({
              id:"0",
              outingId:this.currentOutingId,
              user:{
                id:friend?.inviteeUser?.id,
                name:friend?.inviteeUser?.name || '',
                email:friend?.inviteeUser?.email || ''
              },
              status :this.currentStatus
            })

          } else if (friend.inviteeUser != null && friend.inviteeUser.id == this.userId) {
            this.outingDetails1.push({
              id:"0",
              outingId:this.currentOutingId,
              user:{
                id:friend?.inviterUser?.id,
                name:friend?.inviterUser?.name || '',
                email:friend?.inviterUser?.email || ''
              },
              status :this.currentStatus
            })
          } else if (friend.dummyUser != null) {
            this.outingDetails1.push({
              id:"0",
              outingId:this.currentOutingId,
              user:{
                id:friend?.dummyUser?.id,
                name:friend?.dummyUser?.name || '',
              },
              status :this.currentStatus
            })
          }
        }

        this.selectedFriends = []
        for (let outing of this.data.outingDetails) {
          if (outing.user.id != this.userId) {
            this.selectedFriends.push(outing);
            if (this.outingDetails1.some(item => item.user.id === outing.user.id)) {
              this.outingDetails1 = this.outingDetails1.filter(item => item.user.id !== outing.user.id);
            }
          } else {
            this.currentUserDetails = outing;
          }
        }
        
        this.friendDetails = [];
        
        this.friendDetails = [...this.selectedFriends, ...this.outingDetails1];
        console.log(this.selectedFriends);
        
        

      }, (error) => {
        console.log("Error in fetching friends in outings, "+error)
        this.dialogRef.close(); 
      }
    )
  }

  onMultiselectChange() {
    if (this.selectedFriends.length === 0) {
      this.isMultiselectNotEmpty = false;
    } else {
      this.isMultiselectNotEmpty = true;
      this.combinedFriends = [...this.selectedFriends];

      this.combinedFriends.push(this.currentUserDetails);

    }
  }

  updateOuting(){
    if (this.description && this.selectedFriends.length != 0) {

      if (!this.authService.isLoggedIn()) {
        this.dialogRef.close();
      }
      this.currentUserDetails1 = this.currentUserDetails;
      this.combinedFriends = [...this.selectedFriends];
      this.combinedFriends.push(this.currentUserDetails1);
      this.outingDetails = []
      for(let friend of this.combinedFriends){
        this.outingDetails.push(friend.user.id!);
      }
      console.log(this.outingDetails);
      
      this.responseOuting = {
        id:this.currentOutingId,
        description : this.description,
        date:this.defaultDate,
        outingName:this.outingName,
        userIds:this.outingDetails,
        creatorId:this.creatorId
      }
      console.log(this.combinedFriends);
      this.outingService.updateOuting(this.responseOuting.id, this.responseOuting).subscribe(
        (response: any) => {
          console.log('Successfully Updated', response);
          this.responseOuting = response.body;
          console.log('update and returned ', this.responseOuting);
          this.dialogRef.close(this.responseOuting);
        },
        (error) => {
          console.log('Error in updated', error);
        }
      )

    }
  }
}
