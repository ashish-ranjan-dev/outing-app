import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FriendshipService } from 'src/app/services/friendship.service';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AddExpenseDetailsDto } from 'src/app/models/addExpenseDetailsDto';
import { AddExpenseDto } from 'src/app/models/AddExpenseDto';
import { ExpenseDto } from 'src/app/models/expenseDto';
import { OutingService } from 'src/app/services/outing.service';
import { AddOutingDto } from 'src/app/models/addOutingDto';
import { ResponseOutingDto } from 'src/app/models/responseOutingDto';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [DatePipe]
})

export class AddExpenseComponent {
  friendDetails!: AddExpenseDetailsDto[]
  paidByFriendDetails!: AddExpenseDetailsDto[];
  selectedFriends!: AddExpenseDetailsDto[];
  selectedFriendsWhoPaid!: AddExpenseDetailsDto[];
  defaultDate: any;
  defaultDate1: any;
  friends!: FriendshipDTO[];
  userId: string | null;
  currentUser: any;
  currentUserDetails!: AddExpenseDetailsDto;
  combinedFriends!: AddExpenseDetailsDto[];
  currentUserShare: number = 0;
  currentUserPaid: number = 0;
  description!: string
  amount!: number
  isMultiselectNotEmpty: boolean = false;
  result!: AddExpenseDto
  returnedResult!: ExpenseDto 
  outingId:string;
  outing!:ResponseOutingDto;

  constructor(private datePipe: DatePipe, private authService: AuthService, private friendshipService: FriendshipService, private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef, private route: ActivatedRoute, private formBuilder: FormBuilder, private expenseService: ExpenseService,private outingService:OutingService) {
    this.outingId = this.outingService.getOutingId();
    this.userId = this.authService.getUserIdFromToken();
    this.defaultDate = new Date();
     this.defaultDate1 = this.datePipe.transform(this.defaultDate, 'dd MMM yyyy HH:mm');

    // this.loadFriends();


    
  }

 
  ngOnInit(): void {
    this.loadFriends();
  }


  onMultiselectChange() {
    if (this.selectedFriends.length === 0) {
      this.selectedFriendsWhoPaid = [];
      this.isMultiselectNotEmpty = false;
    } else {
      this.isMultiselectNotEmpty = true;
      this.combinedFriends = [...this.selectedFriends];

      this.combinedFriends.push(this.currentUserDetails);

    }
  }

  isDataValid(data: AddExpenseDto) {

    let totalShareAmount = 0;
    let totalPaidAmount = 0;

    for (let i = 0; i < data.expenseDetails.length; i++) {
      totalShareAmount += data.expenseDetails[i].beneficiaryAmount; totalPaidAmount += data.expenseDetails[i].bearerAmount;
    }
    this.amount = totalShareAmount;
    return 1;
  }

  addExpense(outingId:any) {
    if (this.description && this.selectedFriends ) {
     console.log(this.outingId);
     
      if (!this.authService.isLoggedIn()) {
        this.dialogRef.close();
      }

      let userToUpdate = this.combinedFriends.find(user => user.userId === this.userId);
      if (userToUpdate) {
        userToUpdate.beneficiaryAmount = this.currentUserShare;
        userToUpdate.bearerAmount = this.currentUserPaid;
      }
       this.result = {
        expenseDetails: this.combinedFriends,
        description: this.description,
        totalAmount: this.amount,
        date: this.defaultDate,
        outingId:this.outingId
      };
console.log(this.result);
      for (const friend of this.combinedFriends) {
        console.log(`Friend: ${friend.name}, Share: ${friend.beneficiaryAmount}, Paid: ${friend.bearerAmount}`);
      }
    
      if (this.isDataValid(this.result) == 0) {
        return;
      }
      this.result.totalAmount = this.amount;
      console.log(this.result);
      
      this.expenseService.addExpense(this.result).subscribe(
        (response)=>{
             console.log('added successfully from frontend ', response);
             this.returnedResult = response.body;
             console.log(this.returnedResult);
             this.dialogRef.close(this.returnedResult);
          
        },
        (error)=>{
          console.log('Error in adding expense', error);
        }
       )
      
    }
  }

  loadFriends() {
    this.friendshipService.getAllFriends().subscribe(
      (response: any) => {
        console.log(response);
        if(this.outingId!=''){
          this.friends = [];
          this.outingService.getSingleOuting(this.outingId).subscribe((response1:any)=>{
            this.outing = response1.body;
            for(let res of response.body){
              if(res.inviteeUser)
              for(let friend of this.outing.outingDetails){
                if(friend?.user.id==res.inviteeUser.id){
                  this.friends.push(res);
                }
              }
              else{
                for(let friend of this.outing.outingDetails){
                  if(friend?.user.id==res.dummyUser.id){
                    this.friends.push(res);
                  }
                }
              }
            }
            console.log(this.friends);
            console.log('Friends fetched in expenses', this.friends);
        this.friendDetails = [];
        this.combinedFriends = [];

        if (this.friends.length > 0) {
          this.currentUser = this.friends[0].inviteeUser?.id == this.userId ? this.friends[0].inviteeUser : this.friends[0].inviterUser;
          this.currentUserDetails = {
            userId: this.currentUser?.id,
            name: this.currentUser?.name,
            bearerAmount: 0,
            beneficiaryAmount: 0,
            status :"accepted"
          };
        }
        for (let friend of this.friends) {
          if (friend.dummyUser == null && friend.inviterUser.id == this.userId) {

            this.friendDetails.push({
              userId: friend?.inviteeUser?.id || '',
              name: friend?.inviteeUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status :"invited"
            })

          } else if (friend.inviteeUser != null && friend.inviteeUser.id == this.userId) {
            this.friendDetails.push({
              userId: friend?.inviterUser?.id || '',
              name: friend?.inviterUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status :"invited"
            })
          } else if (friend.dummyUser != null) {
            this.friendDetails.push({
              userId: friend?.dummyUser?.id,
              name: friend?.dummyUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status :"invited"
            })
          }
          console.log(this.friendDetails);
          
         
        }
        this.selectedFriends = [...this.friendDetails];
        this.combinedFriends = [...this.selectedFriends];

        this.combinedFriends.push(this.currentUserDetails);
          },
          (error)=>{
            console.log(error);
          })
        }
        else{
        this.friends = response.body;

        console.log('Friends fetched in expenses', this.friends);
        this.friendDetails = [];
        this.combinedFriends = [];

        if (this.friends.length > 0) {
          this.currentUser = this.friends[0].inviteeUser?.id == this.userId ? this.friends[0].inviteeUser : this.friends[0].inviterUser;
          this.currentUserDetails = {
            userId: this.currentUser?.id,
            name: this.currentUser?.name,
            bearerAmount: 0,
            beneficiaryAmount: 0,
            status :"accepted"
          };
        }
        for (let friend of this.friends) {
          if (friend.dummyUser == null && friend.inviterUser.id == this.userId) {

            this.friendDetails.push({
              userId: friend?.inviteeUser?.id || '',
              name: friend?.inviteeUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status :"invited"
            })

          } else if (friend.inviteeUser != null && friend.inviteeUser.id == this.userId) {
            this.friendDetails.push({
              userId: friend?.inviterUser?.id || '',
              name: friend?.inviterUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status :"invited"
            })
          } else if (friend.dummyUser != null) {
            this.friendDetails.push({
              userId: friend?.dummyUser?.id,
              name: friend?.dummyUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status :"invited"
            })
          }
     
      
          console.log(this.friendDetails);
          
        }
      console.log(this.combinedFriends);
      }

      }, (error) => {
        console.log("Error in fetching friends in expenses")
        this.dialogRef.close(); 
      }
    )
  }
}
