import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-payment-trx-modal',
  // templateUrl: './payment-trx-modal.component.html',
  template: `
    <div class="overlay">
      <div class="paymentTrxPanel">
      </div>
    </div>
  `,
  // styleUrls: ['./payment-trx-modal.component.css']
  styles: [`
    .overlay {
      z-index: 10;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0,0,0,.65);
    }
    .paymentTrxPanel {
      background: white;
      margin-top: 20vh;
      margin-left: 20vw;
      height: 60vh;
      width: 60vw;
      border-radius: 25px;
    }
  `],
})
export class PaymentTrxModalComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<any>) { }

  public ngOnInit() {
    //
  }

  public ngOnDestroy() {
    //
  }

}
