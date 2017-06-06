import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStateActions } from '../../actionHandlers/appState.actions';
import { VehicleType } from '../../models/vehicleType';

@Component({
  selector: 'app-vehicleType',
  // templateUrl: './vehicleType.component.html',
  template: `
    <div class="mainContainer">
      <h1 class="name">{{selectedVehicleType.name}}</h1>
      <div><img class="vehicleTypeImage" src="{{selectedVehicleType?.imageUrl}}" /></div>
      <div class="description">{{selectedVehicleType?.description}}</div>
      <div class="basePrice">{{selectedVehicleType?.basePrice}}</div>
      <div (click)="buyNow()"><img src="http://marketingland.com/wp-content/ml-loads/2015/08/image13.png"/></div>
    </div>
    <app-payment-trx-modal *ngIf="isPaymentTransactionModalShown"></app-payment-trx-modal>
  `,
  // styleUrls: ['./vehicleType.component.css']
  styles: [`
    .mainContainer {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }
    .name {
      font-size: 5em;
    }
    .vehicleTypeImage {
      height: 40vh;
      /* width: 40vw; */
      border-radius: 40px;
    }
    .description {
      font-size: xx-large;
    }
    .basePrice {
      font-size: x-small;
    }
  `],
})
export class VehicleTypeComponent implements OnInit, OnDestroy {

  private vehicleTypes: Array<VehicleType>;
  private vehicleTypesSubscription;

  private selectedVehicleTypeId: string;
  private selectedVehicleType: VehicleType;

  private isPaymentTransactionModalShown: boolean;
  private isPaymentTransactionModalShownSubscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<any>,
    private _appStateActions: AppStateActions,
  ) { }

  public ngOnInit() {
    this.vehicleTypesSubscription = this._store.select('vehicleTypes').subscribe((vt: Array<VehicleType>) => {
      this.vehicleTypes = vt;
    });

    this.isPaymentTransactionModalShownSubscription = this._store.select('appState').subscribe((appState: any) => {
      this.isPaymentTransactionModalShown = appState['isPaymentTransactionModalShown'];
    });

    this._route.params.subscribe(params => {
      this.selectedVehicleTypeId = params['id'];
      this.selectedVehicleType = this.vehicleTypes.find(vt => vt.id === this.selectedVehicleTypeId);
      console.log(`switched to ${JSON.stringify(this.selectedVehicleType)}`);
    });

  }

  public ngOnDestroy() {
    this.vehicleTypesSubscription.unsubscribe();
    this.isPaymentTransactionModalShownSubscription.unsubscribe();
  }

  private buyNow() {
    this._appStateActions.updateState({ 'isPaymentTransactionModalShown': true });
  }
}
