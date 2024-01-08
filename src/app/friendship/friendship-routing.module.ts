import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { SentRequestsComponent } from './sent-requests/sent-requests.component';
import { ReceivedRequestsComponent } from './received-requests/received-requests.component';
import { CreateFriendshipComponent } from './create-friendship/create-friendship.component';
import { FriendComponent } from './friend/friend.component';

const routes: Routes = [
  {path: '', component:FriendsListComponent},
  {path: 'sent-requests', component: SentRequestsComponent},
  {path: 'received-requests', component: ReceivedRequestsComponent},
  {path: 'friend/:id', component: FriendComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendshipRoutingModule { }
