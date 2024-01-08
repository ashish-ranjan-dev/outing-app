import {HttpHeaders} from "@angular/common/http";

export enum Label {

  TITLE='Outing',

  TOKEN_COOKIE_NAME = 'parking-lot-auth-token',

  USERNAME = 'username',

  PASSWORD = 'password'
}

export const  HEADERS:HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
