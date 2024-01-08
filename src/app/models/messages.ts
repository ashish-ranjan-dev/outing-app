import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Messages{
  messages: string[] = [];

  addMessages(messageList:string[]){
    this.messages = [];
    this.messages = messageList;
  }
}
