import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddOutingDto } from 'src/app/models/addOutingDto';
import { OutingService } from 'src/app/services/outing.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { AddOutingDetailsDto } from 'src/app/models/addOutingDetailsDto';
import { OutingDto } from 'src/app/models/outingDto';
import { ResponseOutingDto } from 'src/app/models/responseOutingDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-outing-detail',
  templateUrl: './outing-detail.component.html',
  styleUrls: ['./outing-detail.component.scss'],
  providers: [ DialogService,ConfirmationService]
})
export class OutingDetailComponent {
  outing!:ResponseOutingDto;
  // responseOutingDto!:
  loading: boolean = true;
  outingId!:string;
  outingInExpense=1;
  outingFriends!:AddOutingDetailsDto[];
  userId!:string|null;
    constructor(private route:ActivatedRoute,private outingService:OutingService,private userProfileService:UserProfileService,private router:Router,private authService:AuthService){
      
      setTimeout(() => {
        
        this.loading = false; // Set loading to false after data is loaded
      }, 900);
      this.userId = this.authService.getUserIdFromToken();
    }
    ngOnInit(){
      this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
        console.log(userProfileResponse);
        this.userProfileService.setUserProfile(userProfileResponse.body);
      });
      this.loadOutingDetails();
    }

    loadOutingDetails(){
      this.route.paramMap.subscribe(params => {
        this.outingId = params.get('id')!;
        console.log(this.outingId);
        this.outingService.setOutingId(this.outingId);
        this.outingService.getSingleOuting(this.outingId).subscribe((response:any)=>{
          this.outing = response.body;
          console.log(this.outing);
          
        },
        (error)=>{
          console.log(error);
          this.router.navigate(['outing']);
          
        });
        // this.outingFriends = this.outing.outingDetails;
        console.log(this.outingFriends)
      });
    }

    getCardHeader(outing:any):string {
      if(!outing)return '';
      return outing.outingName;
    }


    getDescription(outing:any):string{
      if(!outing)return '';
      return outing.description;
    }

    backToFriends(){
      this.router.navigate(['outing'])
    }
}
