import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from "primeng/api";
import { FriendshipRoutingModule } from './friendship-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import {StyleClassModule} from 'primeng/styleclass';
import { MessagesModule } from 'primeng/messages';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { SentRequestsComponent } from './sent-requests/sent-requests.component';
import { ReceivedRequestsComponent } from './received-requests/received-requests.component';
import { CreateFriendshipComponent } from './create-friendship/create-friendship.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FriendComponent } from './friend/friend.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UpdateFriendComponent } from './update-friend/update-friend.component';
@NgModule({
  declarations: [SentRequestsComponent,ReceivedRequestsComponent,CreateFriendshipComponent,FriendsListComponent, FriendComponent, UpdateFriendComponent],
  imports: [
    CommonModule,
    FriendshipRoutingModule,
      CardModule,
      ButtonModule,
      HttpClientModule,
      DataViewModule,
      ChipModule,
      TagModule,
      TabViewModule,
      FormsModule ,
      StyleClassModule,
      TableModule,
      InputTextModule,
      TooltipModule,
      ToastModule,
      ReactiveFormsModule,
      DropdownModule,
      DynamicDialogModule,
      ConfirmDialogModule,
      SlideMenuModule,
      SplitButtonModule,
      MenuModule,
      MessagesModule,
      ProgressSpinnerModule
  ],
  providers: [
    MessageService]
})
export class FriendshipModule { }
