import { Component } from '@angular/core';
import {Label} from "../../enums/label";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Messages} from "../../models/messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password-initiation',
  templateUrl: './reset-password-initiation.component.html',
  styleUrls: ['./reset-password-initiation.component.scss']
})
export class ResetPasswordInitiationComponent {

  protected readonly Label = Label;
  usernameOrEmail?: string;

  constructor(private authService: AuthService, private messageService: MessageService, private messageObj: Messages, private router: Router) {
  }

  initiateResetPassword() {
    this.authService.initiateResetPassword(this.usernameOrEmail!).subscribe(() => {
        console.log('Email sent successfully');
        this.goToSignInPage();
      },
      (errors) => {
        console.error('Error in sending email');
      }
    );
  }

  goToSignInPage() {
    this.router.navigate(['user', 'signin']);
  }

}
