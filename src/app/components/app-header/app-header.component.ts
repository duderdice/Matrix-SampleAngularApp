import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import { PaymentTrxResponse } from '../../models/paymentTrxResponse';
import { VehicleType } from '../../models/vehicleType';

@Component({
  selector: 'app-header',
  // templateUrl: './app-header.component.html',
  template: `
    <div class="headerPanel">
      <div class="clickable homeIcon" (click)="home()"><i class="fa fa-home" aria-hidden="true"></i></div>
      <div *ngFor="let vehicleType of vehicleTypes" class="clickable model"
        (click)="vehicleTypeSelected(vehicleType.id)">
        {{vehicleType.name}}
      </div>
      <div *ngIf="paymentTrxResponse" class="clickable homeIcon" (click)="showPaymentTrx()">
        <i class="fa fa-money" aria-hidden="true"></i>
      </div>
    </div>
  `,
  // styleUrls: ['./app-header.component.css']
  styles: [`
    .headerPanel {
      display: flex;
      height: 5em;
      justify-content: space-around;
      align-items: center;
      background: linear-gradient(#006bb3, #e6f5ff);
    }
    .model {
      font-family: FANTASY;
      font-size: x-large;
      flex: 2;
    }
    .homeIcon {
      flex: 1;
      font-size: 2em;
      padding-left: 2em;
    }
  `],
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  private vehicleTypes: Array<VehicleType>;
  private vehicleTypesSubscription;

  private paymentTrxResponse: PaymentTrxResponse;
  private paymentTrxResponseSubscription;

  constructor(
    private _store: Store<any>,
    private _router: Router,
    private _appStateActions: AppStateActions
  ) { }

  public ngOnInit() {
    this.vehicleTypesSubscription = this._store.select('vehicleTypes').subscribe((vt: Array<VehicleType>) => {
      this.vehicleTypes = vt;
    });

    this.paymentTrxResponseSubscription = this._store.select('payment').subscribe((ptr: PaymentTrxResponse) => {
      this.paymentTrxResponse = ptr;
    });
  }

  public ngOnDestroy() {
    this.vehicleTypesSubscription.unsubscribe();
  }

  private vehicleTypeSelected(id): void {
    console.log(`user clicked ${id}!`)
    this._router.navigate(['model', id]);
  }

  private home(): void {
    this._router.navigate(['']);
  }

  private showPaymentTrx() {
    this._appStateActions.updateState({ 'isPaymentTransactionModalShown': true });
  }

}
