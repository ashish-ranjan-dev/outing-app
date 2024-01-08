import { Component } from '@angular/core';
import {Label} from "../../enums/label";
import {SignupDto} from "../../models/signupDto";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Messages} from "../../models/messages";
import { ConfirmationService,ConfirmEventType } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import Validators

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [ ConfirmationService]
})
export class SignupComponent {

  protected readonly Label = Label;
  signupDto: SignupDto = new SignupDto();
  
  constructor(private confirmationService: ConfirmationService,private authService: AuthService, private messageService: MessageService, private messageObj: Messages, private router: Router) {
  }

  signupUser() {
    this.authService.signupApi(this.signupDto).subscribe((response) => {
      
        console.log('Signup Successfully');
        this.goToSignInPage();
      },
      (errors) => {

        console.error('Error in signing up', errors);
      }
    );
  }

  goToSignInPage() {
    this.router.navigate(['user', 'signin']);
  }

  confirmSignin(){
   
      this.confirmationService.confirm({
        message: 'Are you sure that you want to signup?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.signupUser();
  
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
