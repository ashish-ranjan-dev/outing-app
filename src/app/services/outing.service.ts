import { Injectable } from '@angular/core';
import { AddOutingDto } from '../models/addOutingDto';
import { Observable,of,Subject } from 'rxjs';
import { tap,BehaviorSubject } from 'rxjs';
import { OutingDto } from '../models/outingDto';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class OutingService {

  outingData!:AddOutingDto;
  outingId!:string;
  responseoutings: OutingDto[]=[];
  constructor(private http:HttpClient) { }
  // private mockAddOutingDto: AddOutingDto = {
  //   description: 'Sample Outing',
  //   outingDetails: [
  //     {
  //       userId: 'user1',
  //       name: 'User 1'
  //     },
  //     {
  //       userId: 'user2',
  //       name: 'User 2'
  //     },
  //   ],
  //   date: new Date('2023-09-13')
  // };

  setResponseOutings(data:OutingDto){
    this.responseoutings.push(data);
  }

  setData(data:AddOutingDto){
    this.outingData=data;
  }
  getData(){
    return this.outingData;
  }

  setOutingId(id:string){
    this.outingId = id;
  }

  getOutingId(){
    return this.outingId;
  }

  // getAllOutings():OutingDto[]{
  //   return this.responseoutings;
  // }

  addOuting(data:AddOutingDto):Observable<any>{
    const url = `${environment.outingUrl}/create`;
    return this.http.post<any>(url, data);
  }

  getAllOutings():Observable<OutingDto[]>{
    const url = `${environment.outingUrl}/`;
    return this.http.get<OutingDto[]>(url);
  }

  getSingleOuting(outingId:string):Observable<OutingDto[]>{
    const url = `${environment.outingUrl}/${outingId}`;
    return this.http.get<OutingDto[]>(url);
  }

  updateOuting(id:string,data:OutingDto):Observable<any>{
    const url = `${environment.outingUrl}/${id}/update`;
    return this.http.post<any>(url, data);
  }

  getFriends(outingId:string,userId:string|null):Observable<any>{
    const url = `${environment.outingUrl}/${outingId}/user/${userId}/get-friends`;
    return this.http.get<any>(url);
  }

  addFriendInOuting(outingId:string,data:AddOutingDto):Observable<any>{
    const url = `${environment.outingUrl}/${outingId}/invite-friend-in-outing`;
    return this.http.post<any>(url, data);
  }

  approvalStatus(outingId:string,userId:string,approvalStatus:string){
    const url = `${environment.outingUrl}/${outingId}/user/${userId}/status`;
    const data = {approvalStatus};
    return this.http.post<any>(url,approvalStatus);
  }
}
