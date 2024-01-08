import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

@Injectable()
export class HttpMessageInterceptorService implements HttpInterceptor {
  constructor(private messages: MessageService, private authService: AuthService,private router:Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          let messages: string[] = (event as HttpResponse<any>).body.messages;
          console.log(messages);
          
          if (messages && messages.length) {
            messages.forEach((message) =>
              this.messages.add({
                severity: 'success',
                detail: message,
                life: 20000,
              })
            );
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          let response = err as HttpErrorResponse;
          let errors: string[] = response.error?.messages;

          if (errors && errors.length) {

            errors.forEach((error) =>
              this.messages.add({
                severity: 'error',
                detail: error,
                life: 20000,
              })
            );
          } else {
            if(response.status==403 && (response.statusText=="Forbidden" || response.statusText=="OK") ){
          
              if(this.authService.isLoggedIn()) {
              }else{
                this.router.navigate(['user', 'signin']);
              }
            }
          }


        }
        return throwError(() => err);
      })
    );
  }
}