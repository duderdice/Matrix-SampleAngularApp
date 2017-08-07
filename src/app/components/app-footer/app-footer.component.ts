import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

export const { version: appVersion } = require('../../../../package.json');

@Component({
  selector: 'app-footer',
  // templateUrl: './app-footer.component.html',
  template: `
    <div class="footerPanel">
      <div class="footerItem">Locations</div>
      <div class="footerItem">Privacy Policy</div>
      <div class="footerItem">Contact Us</div>
      <div class="footerItem">v{{appVersion}}</div>
    </div>
  `,
  // styleUrls: ['./app-footer.component.css']
  styles: [`
    .footerPanel {
      display: flex;
      height: 4em;
      justify-content: space-around;
      align-items: center;
      background: linear-gradient(#f2f2f2, #a6a6a6);
    }
    .footerItem {
      font-family: Sans;
      font-size: medium;
    }
  `],
})
export class AppFooterComponent implements OnInit, OnDestroy {
  public appVersion: string;

  constructor(
    private _store: Store<any>,
  ) { }

  public ngOnInit() {
    this.appVersion = appVersion;
  }

  public ngOnDestroy() {
  }

}
