import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  // templateUrl: './dashboard.component.html',
  template: `
    <div class="dashboard">
      my dashboard
    </div>
  `,
  // styleUrls: ['./dashboard.component.css']
  styles: [`
  `],
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
