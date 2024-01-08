import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserProfile} from "../models/userProfile";
import {environment} from "../../environments/environment";
import { catchError, tap } from "rxjs/operators"; 
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfileSubject: BehaviorSubject<UserProfile | undefined> = new BehaviorSubject<UserProfile | undefined>(undefined);

  constructor(private httpClient: HttpClient) {
    // this.getProfileApi().subscribe(
    //   (userProfileResponse:any) => {
    //     this.setUserProfile(userProfileResponse.body);
    //   },
    //   (error) => {
    //     // Handle errors if the profile cannot be fetched.
    //     console.error('Error fetching user profile:', error);
    //   }
    // );
  }

  getProfileApi(): Observable<UserProfile> {
  
    return this.httpClient.get<UserProfile>(`${environment.apiAuthUrl}/profile`);
  }

  
  setUserProfile(profile: UserProfile) {
    this.userProfileSubject.next(profile);
  }

  getUserProfile(): Observable<any> {
    return this.userProfileSubject.asObservable();
  }
}
