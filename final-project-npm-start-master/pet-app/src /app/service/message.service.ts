import { Injectable } from '@angular/core';

import {  Observable } from 'rxjs';
import {  Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();
  public messages: string[] = [];

  constructor() { }

  sendMessage(message: string) {
    // this.subject.next({ text: message });
    this.messages.push(message);
  } 

  // 清理信息:
  clearMessage() {
      // this.subject.next();
      this.messages = [];
  }

  //获取信息,@returns { Observable<any> } 返回消息监听
  getMessage(): any[] {
      return this.messages;
  }

}
