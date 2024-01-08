import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddOutingDetailsDto } from 'src/app/models/addOutingDetailsDto';
import { DynamicDialogRef,DynamicDialogConfig,DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { OutingService } from 'src/app/services/outing.service';
import { AddOutingDto } from 'src/app/models/addOutingDto';
import { OutingDto } from 'src/app/models/outingDto';
import { OutingDetailsDto } from 'src/app/models/outingDetailsDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-outing',
  templateUrl: './create-outing.component.html',
  styleUrls: ['./create-outing.component.scss'],
  providers: [DialogService]
})
export class CreateOutingComponent implements OnInit{

  userId: string | null;
      description!: string;
      defaultDate: any;
      outingName!: string;
      outingDetails!: AddOutingDetailsDto[];
      selectedFriends!: AddOutingDetailsDto[];
      currentUserDetails!: AddOutingDetailsDto;
      combinedFriends!: AddOutingDetailsDto[];
      isMultiselectNotEmpty: boolean = false;
      friends!: FriendshipDTO[];
      currentUser: any;
      result!: AddOutingDto
      outings!: AddOutingDto[];
      outing!: AddOutingDto;
      responseOuting!: OutingDto;
      responseOutingDetails!:OutingDetailsDto[]
      friendUserIds!:string[];

      // @Output() outingCreated = new EventEmitter<any>();

  constructor(private dialogRef:DynamicDialogRef,private authService:AuthService,private friendshipService:FriendshipService,private outingService:OutingService,private datePipe:DatePipe){
    this.userId = this.authService.getUserIdFromToken();
    this.defaultDate = new Date();
     this.datePipe.transform(this.defaultDate, 'dd MMM yyyy HH:mm');
  }
  ngOnInit(): void {
    this.loadFriends();
    console.log(this.outings);
  }

      // onMultiselectChange(){
      //   if (this.selectedFriends.length === 0) {
      //     this.selectedFriendsWhoPaid = [];
      //     this.isMultiselectNotEmpty = false;
      //   } else {
      //     this.isMultiselectNotEmpty = true;
      //     this.combinedFriends = [...this.selectedFriends];
    
      //     this.combinedFriends.push(this.currentUserDetails);
    
      //   }
      // }
      loadFriends(){
        this.friendshipService.getAllFriends().subscribe(
          (response: any) => {
            console.log(response);
            this.friends = response.body;
            this.outingDetails = [];
            if (this.friends.length > 0) {
              this.currentUser = this.friends[0].inviteeUser?.id == this.userId ? this.friends[0].inviteeUser : this.friends[0].inviterUser;
              this.currentUserDetails = {
                userId: this.currentUser?.id,
                name: this.currentUser?.name
              };
            }
            for (let friend of this.friends) {
              if (friend.dummyUser == null && friend.inviterUser.id == this.userId) {
    
                this.outingDetails.push({
                  userId: friend?.inviteeUser?.id || '',
                  name: friend?.inviteeUser?.name || ''
                })
    
              } else if (friend.inviteeUser != null && friend.inviteeUser.id == this.userId) {
                this.outingDetails.push({
                  userId: friend?.inviterUser?.id || '',
                  name: friend?.inviterUser?.name || ''
                })
              } else if (friend.dummyUser != null) {
                this.outingDetails.push({
                  userId: friend?.dummyUser?.id,
                  name: friend?.dummyUser?.name || ''
                })
              }
            }
    
          }, (error) => {
            console.log("Error in fetching friends in expenses, "+error)
            this.dialogRef.close(); 
          }
        )
      }

      addOuting(){
        if(this.selectedFriends && this.defaultDate && this.outingName){
          if (!this.authService.isLoggedIn()) {
            this.dialogRef.close();
          }
        this.outings = [];
        this.responseOutingDetails = []
        this.friendUserIds = [];
        for(let friend of this.selectedFriends){
          this.friendUserIds.push(friend.userId);
        }
        this.outing = {description:this.description,
          userIds:this.friendUserIds,
          date:this.defaultDate,
          outingName:this.outingName
        }
        this.outingService.addOuting(this.outing).subscribe((response)=>{
          console.log(response);
          this.responseOuting = response.body;
    
          this.dialogRef.close(this.responseOuting);
        },
        (error)=>{
          console.log("add outing error, "+error);
        })
      }
        
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
}
