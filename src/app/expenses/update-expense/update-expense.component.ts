import { Component } from '@angular/core';
import { FriendshipDTO } from 'src/app/models/friendshipDto';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { DatePipe } from '@angular/common';
import { ExpenseDto } from 'src/app/models/expenseDto';
import { ExpenseDetailsDto } from 'src/app/models/expenseDetailsDto';
import { OutingService } from 'src/app/services/outing.service';


@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss'],
  providers: [DatePipe]
})

export class UpdateExpenseComponent {
  friendDetails: ExpenseDetailsDto[] = []
  selectedFriends!: any[];
  selectedFriendsWhoPaid: ExpenseDetailsDto[] = [];
  defaultDate: any;
  defaultDate1: any;
  friends!: FriendshipDTO[];
  userId: string;
  currentUser: any;
  currentUserDetails!: ExpenseDetailsDto;
  currentUserDetails1!: ExpenseDetailsDto;
  combinedFriends!: ExpenseDetailsDto[];
  currentUserShare: number = 0;
  currentUserPaid: number = 0;
  description!: string
  amount!: number
  creatorId!:string
  isMultiselectNotEmpty: boolean = false;
  data: any;
  updatedData: any;
  passedData: any;
  currentExpenseId!: string;
  friendDetails1: ExpenseDetailsDto[] = [];
  result!: ExpenseDto
  outingId!:string
  returnedResult!: ExpenseDto 

  constructor(private datePipe: DatePipe, public config: DynamicDialogConfig, private authService: AuthService, private friendshipService: FriendshipService, private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef, private route: ActivatedRoute, private formBuilder: FormBuilder, private expenseService: ExpenseService,private outingService:OutingService) {

    this.userId = this.authService.getUserIdFromToken()!;
    this.data = this.config.data.data;
    this.currentExpenseId = this.data.id;
    this.description = this.data.description
    this.defaultDate = this.data.date;
    this.creatorId = this.data.creatorId;
    const date = new Date(this.defaultDate);
    this.defaultDate = date;
    this.defaultDate1 = this.datePipe.transform(this.defaultDate, 'dd MMM yyyy HH:mm');
    this.outingId = this.outingService.getOutingId()
    this.loadFriends();
  }

  loadFriends() {
    this.friendshipService.getAllFriends().subscribe(
      (response: any) => {
        this.friends = response.body;
        this.friendDetails1 = [];

        if (this.friends.length > 0) {
          this.currentUser = this.friends[0].inviteeUser?.id == this.userId ? this.friends[0].inviteeUser : this.friends[0].inviterUser;
          this.currentUserDetails = {
            id: '0',
            expenseId: this.currentExpenseId,
            userId: this.currentUser?.id,
            name: this.currentUser?.name,
            bearerAmount: 0,
            beneficiaryAmount: 0,
            status: 'accepted'
          };
        }
        for (let friend of this.friends) {

          if (friend.dummyUser == null && friend.inviterUser.id == this.userId) {

            this.friendDetails1.push({
              id: '0',
              expenseId: this.currentExpenseId,
              userId: friend?.inviteeUser?.id || '',
              name: friend?.inviteeUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status: 'invited'
            })

          } else if (friend.inviteeUser != null && friend.inviteeUser.id == this.userId) {
            this.friendDetails1.push({
              id: '0',
              expenseId: this.currentExpenseId,
              userId: friend?.inviterUser?.id || '',
              name: friend?.inviterUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status: 'invited'
            })
          } else if (friend.dummyUser != null) {
            this.friendDetails1.push({
              id: '0',
              expenseId: this.currentExpenseId,
              userId: friend?.dummyUser?.id,
              name: friend?.dummyUser?.name || '',
              bearerAmount: 0,
              beneficiaryAmount: 0,
              status: 'invited'
            })
          }
        }

        this.selectedFriends = []
        for (let expense of this.data.expenseDetails) {
          if (expense.userId != this.userId) {
            this.selectedFriends.push(expense);
            if (this.friendDetails1.some(item => item.userId === expense.userId)) {
              this.friendDetails1 = this.friendDetails1.filter(item => item.userId !== expense.userId);
            }
          } else {
            this.currentUserDetails = expense;
            this.currentUserPaid = expense.bearerAmount;
            this.currentUserShare = expense.beneficiaryAmount
          }
        }

        this.friendDetails = [...this.selectedFriends, ...this.friendDetails1];
        console.log(this.friendDetails);
        

      }, (error) => {
        console.log("Error in fetching friends in expenses")
        this.dialogRef.close();
      }
    )
  }

  isDataValid(data: ExpenseDto) {

    let totalShareAmount = 0;
    let totalPaidAmount = 0;

    for (let i = 0; i < data.expenseDetails.length; i++) {
      totalShareAmount += data.expenseDetails[i].beneficiaryAmount;
      totalPaidAmount += data.expenseDetails[i].bearerAmount;
    }
    // if (totalShareAmount !== totalPaidAmount) {
    //   console.log('Invalid Share between friends');
    //   return 0;
    // }

    this.amount = totalShareAmount
    return 1;
  }

  updateExpense() {



    if (this.description && this.selectedFriends.length != 0) {

      if (!this.authService.isLoggedIn()) {
        this.dialogRef.close();
      }
      this.currentUserDetails1 = this.currentUserDetails;
      this.currentUserDetails1.bearerAmount = this.currentUserPaid;
      this.currentUserDetails1.beneficiaryAmount = this.currentUserShare;
      this.combinedFriends = [...this.selectedFriends];
      this.combinedFriends.push(this.currentUserDetails1);
      console.log(this.combinedFriends);
      

      this.result = {
        id: this.currentExpenseId,
        description: this.description,
        totalAmount: this.amount,
        expenseDetails: this.combinedFriends,
        date: this.defaultDate,
        creatorId: this.creatorId,
        outingId:this.outingId
      };


      if (this.isDataValid(this.result) == 0) {
        return;
      }

      this.result.totalAmount = this.amount;
      this.expenseService.updateExpense(this.result.id, this.result).subscribe(
        (response: any) => {
          console.log('Successfully Updated', response);
          this.result = response.body;
          console.log('update and returned ', this.result);
          this.dialogRef.close(this.result);
        },
        (error) => {
          console.log('Error in updated', error);
        }
      )
    }
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
}
