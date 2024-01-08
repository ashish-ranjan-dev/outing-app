import { Component } from '@angular/core';
import {SigninDto} from "../../models/signin";
import {MessageService} from "primeng/api";
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Messages} from "../../models/messages";
import {Label} from "../../enums/label";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  protected readonly Label = Label;
  signingInUser: SigninDto = new SigninDto();

  constructor(private router: Router, private authService: AuthService, private messageService: MessageService, private messageObj: Messages) {
   
  }

  signinUser() {
    
    this.authService.signinApi(this.signingInUser).subscribe((response: any) => {
     
        this.authService.setCookie(response.body);
        console.log("Signed In Successfully")
        // this.signingInUser.username = undefined;
        // this.signingInUser.password = undefined;
        
        this.goToDashBoard();
      },
      (errors) => {
        console.error('Error in signing in', errors);
      }
    );
  }

  goToDashBoard() {
    this.router.navigate(['']);
  }

  gotToSignup(){
    this.router.navigate(['user','signup']);
  }

  gotToForgotPassword(){
    this.router.navigate(['user','reset-password','initiate']);
  }
}
