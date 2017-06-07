import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  // templateUrl: './home.component.html',
  template: `
    <div class="homePanel">
      <h1 class="header1">Would you like to drive</h1>
      <h1 class="header2">the FUTURE?</h1>
    </div>
  `,
  // styleUrls: ['./home.component.css']
  styles: [`
    .homePanel {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .header1 {
      font-family: FANTASY;
      font-size: 4em;
    }
    .header2 {
      font-family: FANTASY;
      font-size: 6em;
    }
  `],
})
export class HomeComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
  }

}
