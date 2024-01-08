import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {SignupDto} from "../models/signupDto";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {SigninDto} from "../models/signin";
import {HEADERS, Label} from "../enums/label";
import {ResetPasswordDto} from "../models/reset-passwordDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) {
  }

  signupApi(signupDto: SignupDto): Observable<Object> {
    console.log(signupDto);
    return this.httpClient.post<Object>(`${environment.apiAuthUrl}/signup`, signupDto);
  }

  signinApi(signinDto:SigninDto):Observable<string>{
    const headers:HttpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    const body:URLSearchParams=new URLSearchParams();
    body.set(Label.USERNAME,signinDto.username!);
    body.set(Label.PASSWORD,signinDto.password!);
    return this.httpClient.post<string>(`${environment.apiAuthUrl}/signin`,body.toString(), {headers});
  }

  initiateResetPassword(usernameOrEmail: string): Observable<Object> {
    return this.httpClient.post<Object>(`${environment.apiAuthUrl}/reset-password/initiate`, usernameOrEmail,{headers:HEADERS});
  }

  resetPassword(userId: string, resetId: string, resetPasswordDto: ResetPasswordDto): Observable<Object> {
    return this.httpClient.post<Object>(`${environment.apiAuthUrl}/reset-password/user/{userId}/reset/{resetId}`, resetPasswordDto,{headers:HEADERS});
  }

  setCookie(token: string) {
    const cookieOptions: any = {
      expires: 1,
      path: '/',
      sameSite: 'Strict'
    };
    this.cookieService.set(Label.TOKEN_COOKIE_NAME,token,cookieOptions);
  }

  getToken(): string | undefined {
    return this.cookieService.get(Label.TOKEN_COOKIE_NAME);
  }

  isLoggedIn(): boolean {
    let jwtToken = this.getToken();
    this.isUserLoggedIn = !!(jwtToken);
    return this.isUserLoggedIn;
  }

  isLoggedInOrElseNavigateToSignin(): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    console.log("Help me out")
    this.router.navigate(['user', 'signin']);
    return false;
    // return true;
  }

  isNotLoggedInOrElseNavigateToHome() {
    if (!this.isLoggedIn()) {      
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

  logOut() {
    this.cookieService.delete(Label.TOKEN_COOKIE_NAME, '/');
    this.router.navigate(['user', 'signin']);
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    // console.log(token);
    if (token) {
      // Split the token into parts (header, payload, signature)
      const parts = token.split('.');
      // console.log(parts);
      if (parts.length === 3) {
        // Decode the payload (the middle part)
        const payload = JSON.parse(atob(parts[1]));
        // console.log(payload.sub);
        return payload.sub; // Assuming your token has a userId field
      }
    }
    return null; // Return null if the token is invalid or doesn't contain user information
  }
}
