import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FriendshipDTO } from '../models/friendshipDto';
import { tap } from 'rxjs/operators';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  public  friendRemovedSubject = new Subject<FriendshipDTO>();

  constructor(private http: HttpClient) { }

  getAllFriends(): Observable<FriendshipDTO[]>{

      const url = `${environment.friendshipUrl}/`;
      return this.http.get<FriendshipDTO[]>(url);
  }

  sentRequests():Observable<FriendshipDTO[]>{

    const url = `${environment.friendshipUrl}/sent-requests`;
    return this.http.get<FriendshipDTO[]>(url);
  }

  receivedRequests():Observable<FriendshipDTO[]>{

    const url = `${environment.friendshipUrl}/received-requests`;
    return this.http.get<FriendshipDTO[]>(url);
  }



  sendInvite(name: string, email: string): Observable<any> {
    const inviteData = { name, email };
    const url = `${environment.friendshipUrl}/invite`;

    // Send the HTTP POST request and get the Observable

    console.log(name + " -" + email);
    return this.http.post<any>(url, inviteData).pipe(
      tap((response) => {
        // Log the response from the server

        if(response.body.dummyUser !== null){
          this.friendRemovedSubject.next(response.body);
        }
        console.log('Response from the server:', response);
      },
      (error)=>{
        console.log('Error from the server:', error);

      })
    );
  }

  revokeFriendship(friendship_id: string){
    const url  =`${environment.friendshipUrl}/${friendship_id}/revoke`;

    return this.http.post<any>(url, null).pipe(

      tap((response:string)=>{
        console.log('Successfully Removed');
      },
      (error)=>{
        console.log('Error from the server', error);
      })
    )
  }

  cancelFriendship(friendship_id: string){
    const url  =`${environment.friendshipUrl}/${friendship_id}/cancel`;

    return this.http.post<any>(url, null).pipe(

      tap((response:string)=>{
        console.log('Successfully Canceled Friendship', response);

        // Notify subscribers (FriendsListComponent) that a friend has been removed


      },
      (error)=>{
        console.log('Error from the server', error);
      })
    )
  }


  rejectFriendship(friendship_id: string){
    const url  =`${environment.friendshipUrl}/${friendship_id}/reject`;

    return this.http.post<any>(url, null).pipe(

      tap((response:string)=>{
        console.log('Successfully rejected Friendship', response);
      },
      (error)=>{
        console.log('Error from the server', error);
      })
    )
  }

  acceptFriendship(friendship_id: string){
    const url  =`${environment.friendshipUrl}/${friendship_id}/accept`;

    return this.http.post<any>(url, null).pipe(

      tap((response:string)=>{
        console.log('Successfully Accepted Friendship', response);
      },
      (error)=>{
        console.log('Error from the server', error);
      })
    )
  }

  getFriendDetails(friendship_id: string){
     const url = `${environment.friendshipUrl}/${friendship_id}/friend`;
     return this.http.get<FriendshipDTO>(url);
  }

  updateFriendDetails(email: string , friendship_id:string){
    const updateData = { email, friendship_id };
    const url = `${environment.friendshipUrl}/update`;

    return this.http.post<any>(url, updateData).pipe(
      tap((response) => {
        // Log the response from the server
        console.log('Response from the server:', response);
      },
      (error)=>{
        console.log('Error from the server:', error);

      })
    );
  }
}
