import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateOutingComponent } from '../create-outing/create-outing.component';
import { AddOutingDto } from 'src/app/models/addOutingDto';
import { OutingService } from 'src/app/services/outing.service';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { DatePipe } from '@angular/common';
import { OutingDto } from 'src/app/models/outingDto';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService, MenuItem ,ConfirmEventType} from 'primeng/api';
import { Menu } from 'primeng/menu';
import { AddOutingDetailsDto } from 'src/app/models/addOutingDetailsDto';
import { UpdateOutingComponent } from '../update-outing/update-outing.component';
import { AddFriendComponent } from '../add-friend/add-friend.component';

@Component({
  selector: 'app-outing-list',
  templateUrl: './outing-list.component.html',
  styleUrls: ['./outing-list.component.scss'],
  providers: [DialogService,DatePipe,ConfirmationService]
})
export class OutingListComponent implements OnInit{
  outings!: OutingDto[];
  outing!: OutingDto;
  loading: boolean = true;
  beautifyDate!: Map<string,any>;
  userId!:string;
  ref : DynamicDialogRef | undefined;
  @ViewChild('menu') menu!: Menu;
  @ViewChild('menu1') menu1!: Menu;
  @ViewChild('menu2') menu2!: Menu;
  items!: MenuItem[];
  items1!:MenuItem[];
  items2!:MenuItem[];
  currentExpense:any;
  outingFriends!:AddOutingDetailsDto;
  approvalData!:any;


  constructor(private dialogService:DialogService,private outingService:OutingService,private router:Router,private userProfileService:UserProfileService,private dataPipe:DatePipe,private authService:AuthService,private confirmationService:ConfirmationService){

    setTimeout(() => {
      // this.route.paramMap.subscribe(params => {
      // //   this.outingId = params.get('id')!;
      // //   console.log(this.outingId);
      // //   this.outingService.setOutingId(this.outingId);
      // //   this.outing = this.outingService.getData();
      // // });
      this.loading = false; // Set loading to false after data is loaded
    }, 900);

    this.userId = this.authService.getUserIdFromToken()!;

      this.beautifyDate = new Map<string, string>();

      this.items1 = [
        {
          label: 'Status ',
          items: [
            {
              label: 'Approve',
              icon: 'pi pi-check',
              command: () => {
                let statement = 'Are you sure you want to approve the expense?';
                this.approvalStatus(statement,this.approvalData.outingId , this.approvalData.userId, 'accepted');
              }
            },
            {
              label: 'Reject',
              icon: 'pi  pi-times',
              command: () => {
                let statement = 'Are you sure you want to disapprove the expense?';
                this.approvalStatus(statement, this.approvalData.outingId , this.approvalData.userId, 'rejected');
              }
            }
          
          ]
        }
      ]

      this.items2 = [
        {
          label: 'Status ',
          items: [
            {
              label: 'Approve',
              icon: 'pi pi-check',
              command: () => {
                let statement = 'Are you sure you want to approve the expense?';
                this.approvalStatus(statement, this.approvalData.outingId , this.approvalData.userId, 'accepted');
              }
            }
          ]
        }
      ]
  }


  ngOnInit(): void {
    this.loadOuting();
    this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
      console.log(userProfileResponse);
      this.userProfileService.setUserProfile(userProfileResponse.body);
    });

    this.beautifyDate = new Map<string, string>();
  }

    

    showDialog(){
        this.ref = this.dialogService.open(CreateOutingComponent,{
          header: 'Add Outing',
          width: '43%',
          contentStyle: { "padding-bottom":"24px"},
          baseZIndex: 10000,
          maximizable: false,
          styleClass: 'custom-dialog',
          data: {
            dialogRef: this.ref // Pass the dialog reference
          }
        });
        this.ref.onClose.subscribe((data)=>{
          if(!data){
            return;
          }
          // this.outingFriends = data.;
          this.beautifyDate.set(data.id,this.dataPipe.transform(data.date, 'dd MMM yyyy HH:mm')!);
          console.log(data);
          this.outing = data;
          // this.outingService.setData(this.outing);
          // this.outings.push(data);
          this.loadOuting();
        })
    }


    loadOuting(){
     
      this.outingService.getAllOutings().subscribe((response:any)=>{
        console.log(response);
        
        this.outings = response.body;
        console.log(this.outings);
        
        for (let product of this.outings) {
          let productDate = this.dataPipe.transform(product.date, 'dd MMM yyyy HH:mm')!;
          this.beautifyDate.set(product.id , productDate!);
        }
      },
      (error)=>{
        console.log(error);
        
      });
      if(this.outings)
      for (let product of this.outings!) {
        let productDate = this.dataPipe.transform(product.date, 'dd MMM yyyy HH:mm')!;
        this.beautifyDate.set(product.id , productDate!);
      }
    }

    getCardHeader(outing:any):string{
      return outing.name;
    }

    showContextMenu(outing:any){
      this.outing = outing;
      
      if(this.outing.creatorId.id==this.userId)
    this.items = [
      {
        label: 'Outing ',
        items: [
          {
            label: 'Details',
            icon: 'pi pi-folder',
            command: () => {
               this.outingDetail(this.outing);
            }
          },
          {
            label: 'Update',
            icon: 'pi pi-pencil',
            command: () => {
              this.updateOuting(this.outing);
            }
          },
        
        ]
      }]
      else
      this.items = [
        {
          label: 'Outing ',
          items: [
            {
              label: 'Details',
              icon: 'pi pi-folder',
              command: () => {
                 this.outingDetail(this.outing);
              }
            },
            {
              label: 'Add Friends',
              icon: 'pi pi-pencil',
              command: () => {
                this.addFriendsInOuting(this.outing);
              }
            }
          ]
        }]
      this.menu.toggle(event);
    }

    showContextMenu1(outingId:string,userId:string,acceptanceApproval:string){
      this.approvalData = {
        outingId : outingId,
        userId : userId,
        acceptanceApproval : acceptanceApproval
     }
     this.menu1.toggle(event);
    }

    showContextMenu2(outingId:string,userId:string,acceptanceApproval:string){
      this.approvalData = {
        outingId : outingId,
        userId : userId,
        acceptanceApproval : acceptanceApproval
     }
     this.menu2.toggle(event);
    }

    updateOuting(outing: OutingDto) {
      this.ref = this.dialogService.open(UpdateOutingComponent, {
        header: 'Update Outing',
        width: '43%',
        contentStyle: { "padding-bottom": "24px" },
  
        maximizable: false,
        styleClass: 'custom-dialog',
        data: {
          dialogRef: this.ref,
          data: outing
        }
  
  
      });
    
      this.ref.onClose.subscribe((data) => {
        
        if (data) {
          const index = this.outings.findIndex((outing) => outing.id === data.id);
      
          if (index !== -1) {
            this.beautifyDate.set(data.id,this.dataPipe.transform(data.date, 'dd MMM yyyy HH:mm')!);
            this.outings[index] = data;
          }
          this.loadOuting();
        }
      });
    }

    outingDetail(outing:OutingDto){
      this.router.navigate(['outing',outing.id]);
    }



    addFriendsInOuting(outing:OutingDto){
      this.ref = this.dialogService.open(AddFriendComponent, {
        header: 'Add Freind',
        width: '43%',
        contentStyle: { "padding-bottom": "24px" },
  
        maximizable: false,
        styleClass: 'custom-dialog',
        data: {
          dialogRef: this.ref,
          data: outing
        }
  
  
      });
    
      this.ref.onClose.subscribe(() => {
          this.loadOuting();
      });
    }

    approvalStatus(statement: string ,outingId: string, userId : string, approvalStatus: string){
      this.confirmationService.confirm({
        message: `${statement}`,
        header: 'Approve Expense',
        icon: 'pi pi-info-circle',
        accept: () => {
          console.log(outingId);
          
          this.outingService.approvalStatus(outingId , userId, approvalStatus).subscribe(
            (response)=>{
              let res = response.body;
              // update the expense->expense detail->status <<<< update
             
              console.log("Response from server", res);
              this.loadOuting();
  
            },(error)=>{
              console.log('Error in updating expense status' ,error);
            }
          )
          this.confirmationService.close();
          this.router.navigate(['outing']);
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
