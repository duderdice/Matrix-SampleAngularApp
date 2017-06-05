import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  // templateUrl: './home.component.html',
  template: `
    <div>my home component
    </div>
  `,
  // styleUrls: ['./home.component.css']
  styles: [`
    /* */
  `],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
