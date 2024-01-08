import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ResetPasswordInitiationComponent} from "./reset-password-initiation/reset-password-initiation.component";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({

  declarations: [
    SignupComponent,
    SigninComponent,
    ResetPasswordComponent,
    ResetPasswordInitiationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    RippleModule,
    ConfirmDialogModule,
    PasswordModule,
    DividerModule,
    TooltipModule
  ]
})
export class AuthModule { }
