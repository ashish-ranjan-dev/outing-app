import { Component, Input, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { MessageService } from 'primeng/api';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { UpdateExpenseComponent } from '../update-expense/update-expense.component';
import { DatePipe } from '@angular/common';
import { Menu } from 'primeng/menu'; // Import Menu
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ExpenseDto } from 'src/app/models/expenseDto';
import { ExpenseDetailsDto } from 'src/app/models/expenseDetailsDto';
import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { OutingService } from 'src/app/services/outing.service';
import { OutingDto } from 'src/app/models/outingDto';
import { AddOutingDetailsDto } from 'src/app/models/addOutingDetailsDto';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [MessageService, DialogService, DatePipe, ConfirmationService]
})


export class ExpensesComponent {
  loading: boolean = true;
  ref: DynamicDialogRef | undefined;
  expenses: ExpenseDto[] = [];
  currentExpense: any;
  @ViewChild('menu') menu!: Menu;
  @ViewChild('menu1') menu1!:Menu;
  @ViewChild('menu2') menu2!:Menu;
  items1!: MenuItem[];
  items!: MenuItem[];
  items2!:MenuItem[];
  beautifyDate!: Map<string,any>;
  addedData! : ExpenseDto;
  userId!:string;
  approvalData!:any;
  @Input() outingInExpense=0;
  @Input() outingId!:string;
  @Input() outingFriends!:AddOutingDetailsDto[];
  mockExpenses!:ExpenseDto[];

  constructor(private expenseService: ExpenseService,private authService: AuthService,private confirmationService: ConfirmationService, private dataPipe: DatePipe, private router: Router, private userProfileService: UserProfileService, public dialogService: DialogService,private outingService:OutingService) {
   
    setTimeout(() => {
      this.loading = false;
    }, 900);
    console.log(this.outingId);
    
    this.userProfileService.getProfileApi().subscribe((userProfileResponse: any) => {
      console.log(userProfileResponse);
      this.userProfileService.setUserProfile(userProfileResponse.body);
    });

    this.userId = this.authService.getUserIdFromToken()!;

    this.items = [
      {
        label: 'Expense ',
        items: [
          {
            label: 'Details',
            icon: 'pi pi-folder',
            command: () => {
              console.log(this.currentExpense);
              
               this.expenseDescription(this.currentExpense);
            }
          },
          {
            label: 'Update',
            icon: 'pi pi-pencil',
            command: () => {
              this.updateExpense(this.currentExpense);
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.deleteExpenseConfirmation(this.currentExpense.id)
            }
          },
          {
            label: '',
            icon: '',
            visible:false,
            command: () => {
              if(this.currentExpense.outingId!=''){
                this.items[3].visible=true;
                this.items[3].label='Go to Outing';
                this.items[3].icon='fas fa-arrow-circle-right';
              // this.deleteExpenseConfirmation(this.currentExpense.id)
              }
            }
          },
        ]
      }]


      this.items1 = [
        {
          label: 'Status ',
          items: [
            {
              label: 'Approve',
              icon: 'pi pi-check',
              command: () => {
                let statement = 'Are you sure you want to approve the expense?';
                this.approvalStatus(statement,this.approvalData.expenseId , this.approvalData.userId, 'accepted');
              }
            },
            {
              label: 'Reject',
              icon: 'pi  pi-times',
              command: () => {
                let statement = 'Are you sure you want to disapprove the expense?';
                this.approvalStatus(statement, this.approvalData.expenseId , this.approvalData.userId, 'rejected');
              }
            }
          
          ]
        }]

        
      this.items2 = [
        {
          label: 'Status ',
          items: [
            {
              label: 'Approve',
              icon: 'pi pi-check',
              command: () => {
                let statement = 'Are you sure you want to approve the expense?';
                this.approvalStatus(statement, this.approvalData.expenseId , this.approvalData.userId, 'accepted');
              }
            }
          ]
        }]
      this.beautifyDate = new Map<string, string>();
  }

  ngOnInit(): void {
    console.log(this.outingInExpense);
    if(!this.outingInExpense)
      this.outingService.setOutingId('');
    else{
      console.log(this.outingId);
      
      this.outingService.setOutingId(this.outingId);
    }
    this.loadExpenses();
  }

  showContextMenu(product: any) {
    this.currentExpense = product;
    this.menu.toggle(event);
  }

  showContextMenu1(expenseId: string, userId: string, acceptanceApproval: string){
    this.approvalData = {
       expenseId : expenseId,
       userId : userId,
       acceptanceApproval : acceptanceApproval
    }
    this.menu1.toggle(event);
  }

  

  showContextMenu2(expenseId: string, userId: string, acceptanceApproval: string){
    this.approvalData = {
       expenseId : expenseId,
       userId : userId,
       acceptanceApproval : acceptanceApproval
    }
    this.menu2.toggle(event);
  }
  loadExpenses() {
    if(!this.outingId){
    this.expenseService.getAllExpenses().subscribe(
      (response: any)=>{
         this.expenses = response.body
         console.log('Expenses ', this.expenses);
         for (let product of this.expenses) {
          let productDate = this.dataPipe.transform(product.date, 'dd MMM yyyy HH:mm')!;
          this.beautifyDate.set(product.id , productDate!);
        }
      },
      (error)=>{
        console.log('Error in fetching expenses');
      }
    )
 
    for (let product of this.expenses) {
      let productDate = this.dataPipe.transform(product.date, 'dd MMM yyyy HH:mm');
      this.beautifyDate.set(product.id , productDate!);
    }
  }
  else{
    // this.mockExpenses = this.expenseService.getAllExpensesWithOutingId(this.outingId);
    // this.expenses = this.mockExpenses
    this.expenseService.getAllExpensesInOuting(this.outingId).subscribe((resposne:any)=>{
      this.expenses = resposne.body;
      if(this.expenses)
         for (let product of this.expenses) {
          let productDate = this.dataPipe.transform(product.date, 'dd MMM yyyy HH:mm')!;
          this.beautifyDate.set(product.id , productDate!);
        }
        else{
          this.expenses = []
        }
    },
    (error)=>{
      console.log(error);
      
    })
    this.expenses = this.expenseService.getAllExpensesWithOutingId(this.outingId);
         console.log('Expenses ', this.expenses);
         
  }
  }

  showDialog() {
    this.ref = this.dialogService.open(AddExpenseComponent, {
      header: 'Add Expense',
      width: '43%',
      contentStyle: { "padding-bottom": "24px" },
      maximizable: false,
      styleClass: 'custom-dialog',
      data: {
        dialogRef: this.ref
      }
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {     
        this.addedData = data;
        this.beautifyDate.set(data.id,this.dataPipe.transform(data.date, 'dd MMM yyyy HH:mm')!);
        if(this.outingId==='')
        this.expenses.push(this.addedData);
        this.loadExpenses();
      }
    });
  }

  updateExpense(expense: ExpenseDto) {
    this.ref = this.dialogService.open(UpdateExpenseComponent, {
      header: 'Update Expense',
      width: '43%',
      contentStyle: { "padding-bottom": "24px" },

      maximizable: false,
      styleClass: 'custom-dialog',
      data: {
        dialogRef: this.ref,
        data: expense
      }


    });
  
    this.ref.onClose.subscribe((data) => {
      
      if (data) {
        const index = this.expenses.findIndex((expense) => expense.id === data.id);
       console.log(index);
       console.log(this.expenses);
        if (index !== -1) {
          this.beautifyDate.set(data.id,this.dataPipe.transform(data.date, 'dd MMM yyyy HH:mm')!);
          // if(this.outingId==='')
          this.expenses[index] = data;
        }
        this.loadExpenses();
      }
    });
  }

  deleteExpense(expenseId: string) {
    
    this.expenseService.deleteExpenseById(expenseId).subscribe(
      (response:any)=>{
        console.log('Successfully Deleted');
        this.expenses = this.expenses.filter((item)=>{
          return item.id !==  expenseId
       })
      },
      (error)=>{
        console.log('Error in deleting expense', error);
      }
    )
  
  }

  deleteExpenseConfirmation(expenseId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this expense?',
      header: 'Remove Expense',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteExpense(expenseId);
        this.confirmationService.close();
        if(this.outingId=='')
        this.router.navigate(['expenses']);
      else this.router.navigate(['outing',this.outingId]);
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

  expenseDescription(currentExpense : any) {
    this.ref = this.dialogService.open(ExpenseDetailsComponent, {
      header: 'Expense Details',
      width: '43%',
      contentStyle: { "padding-bottom": "24px" },
      maximizable: false,
      styleClass: 'custom-dialog',
      data: {
        dialogRef: this.ref,
        data : currentExpense
      }
    });

    this.ref.onClose.subscribe((data) => {
     
    });
  }

  approvalStatus(statement: string ,expenseId: string, userId : string, approvalStatus: string) {
    this.confirmationService.confirm({
      message: `${statement}`,
      header: 'Approve Expense',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.expenseService.approveStatus(expenseId , userId, approvalStatus).subscribe(
          (response)=>{
            let res = response.body;
            // update the expense->expense detail->status <<<< update
           
            console.log("Response from server", res);
            this.loadExpenses();

          },(error)=>{
            console.log('Error in updating expense status' ,error);
          }
        )
        this.confirmationService.close();
        this.router.navigate(['expenses']);
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

  goToOuting(expense:any){
    this.router.navigate(['outing',expense.outingId])
  }

}
