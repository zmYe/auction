import { Component, OnInit } from '@angular/core';
import {SocketService} from './socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  messageCount = 0;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.createObServableSocket("ws://localhost:8001")
      .map(event => JSON.parse(event))
      .subscribe(event => this.messageCount = event.messageCount);
    this.socketService.send();
  }

}
