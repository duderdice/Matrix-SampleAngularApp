import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { VehicleType } from '../../models/vehicleType';

@Component({
  selector: 'app-vehicleType',
  // templateUrl: './vehicleType.component.html',
  template: `
    <div class="mainContainer">
      <h1 class="name">{{vehicleType.name}}</h1>
      <div><img class="vehicleTypeImage" src="{{vehicleType?.imageUrl}}" /></div>
      <div class="description">{{vehicleType?.description}}</div>
      <div class="basePrice">{{vehicleType?.basePrice}}</div>
      <button type="button" (click)="buyNow()">Buy Now!</button>
    </div>
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
      height: 300px;
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
  private id: string;
  private url: string;
  private vehicleType: VehicleType;
  private vehicleTypes: Array<VehicleType>;
  private vehicleTypesSubscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<any>,
  ) { }

  public ngOnInit() {
    this.vehicleTypesSubscription = this._store.select('vehicleTypes').subscribe((vt: Array<VehicleType>) => {
      this.vehicleTypes = vt;
    });

    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.vehicleType = this.vehicleTypes.find(vt => vt.id === this.id);
      console.log(`switched to ${JSON.stringify(this.vehicleType)}`);
    });

  }

  public ngOnDestroy() {
    this.vehicleTypesSubscription.unsubscribe();
  }

  private buyNow() {

  }
}
