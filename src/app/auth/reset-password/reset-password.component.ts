import {Component} from '@angular/core';
import {Label} from "../../enums/label";
import {ResetPasswordDto} from "../../models/reset-passwordDto";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Messages} from "../../models/messages";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  protected readonly Label = Label;
  resetPasswordDto: ResetPasswordDto = new ResetPasswordDto();
  userId?: string;
  resetId?: string;

  constructor(private authService: AuthService, private messageService: MessageService, private messageObj: Messages, private router: Router, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['userId'];
    this.resetId = this.route.snapshot.params['resetId'];
  }

  resetPassword() {
    this.authService.resetPassword(this.userId!, this.resetId!, this.resetPasswordDto!).subscribe((response) => {
       console.log('Password reset successful');
        this.goToSignInPage();
      },
      (errors) => {
        console.error('Error in reseting password')
      }
    );
  }

  goToSignInPage() {
    this.router.navigate(['user', 'signin']);
  }
}
