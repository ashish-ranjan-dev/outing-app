import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {HttpClientModule , HTTP_INTERCEPTORS} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {OverlayPanelModule} from "primeng/overlaypanel";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FriendComponent } from './friendship/friend/friend.component';
import { TokenInterceptor } from './services/token.interceptor';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { HttpMessageInterceptorService } from './services/http-message-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    RippleModule,
    FormsModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    TieredMenuModule,
    MenuModule,
    MessagesModule,
    MenubarModule
    
  ],
  providers: [
    MessageService, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMessageInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
