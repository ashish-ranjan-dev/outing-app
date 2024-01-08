import {Component, OnInit , ViewChild } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserProfileService} from "./services/user-profile.service";
import {UserProfile} from "./models/userProfile";
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[]
})
export class AppComponent implements OnInit{

  title = 'Outing';
  userProfile?: UserProfile;
  constructor(public route : Router,public authService:AuthService, private userProfileService:UserProfileService, public messageService: MessageService) {
  }

  ngOnInit() {

    //  this.userProfileService.getProfileApi().subscribe((userProfileResponse:any)=>{
    //   console.log(userProfileResponse);
    //   this.userProfile=userProfileResponse.body;
    //   this.userProfileService.setUserProfile(userProfileResponse.body);
    // });
    
    this.userProfileService.getUserProfile().subscribe((userProfile)=>{
      this.userProfile=userProfile;
    });
  
    
  }

  signOutClicked($event: any) {
    $event.hide();
    this.userProfile = undefined;
    this.messageService.add({ severity: 'success',  detail: 'Signout Successfully!', sticky: true  });
    setTimeout(() => {
      this.messageService.clear(); // Remove the toast manually
    }, 20000); 
    this.authService.logOut();
  }
  @ViewChild('mobileMenu') mobileMenu!: OverlayPanel;

  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home', routerLinkActiveOptions: { exact: true, class: 'active' }},
    { label: 'Outings', icon: 'pi pi-map-marker', routerLink: '/outing' },
    { label: 'Friends', icon: 'pi pi-users', routerLink: '/friendship' },
    { label: 'Expenses', icon: 'pi pi-dollar', routerLink: '/expenses' },
    
  ];

  toggleMobileMenu(event: Event) {
    this.mobileMenu.toggle(event);
  }

  closeMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.hide();
    }
  }  
  
  tier={
      'width':'8.5rem'
  }
}
