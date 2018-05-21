import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SocketService {

  ws: WebSocket;

  constructor() { }

  createObServableSocket(url:string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observable => {
        this.ws.onmessage = (event) => observable.next(event.data);
        this.ws.onerror = (event) => observable.error(event);
        this.ws.onclose = (event) => observable.complete();
      });
  }

  send() {
    if(this.ws) {
      setInterval(() => {
        this.ws.send("aaaa");
      },2000);
    }
  }

}
