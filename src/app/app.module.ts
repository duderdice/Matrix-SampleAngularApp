import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from "@ngrx/store";
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AppComponent } from './components/app/app.component';
import { APP_ACTION_HANDLERS } from './index';
import { APP_COMPONENTS } from './index';
import { APP_ROUTES } from './index';
import { APP_SERVICES } from './index';
import { APP_STORES } from './index';

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(APP_ROUTES),
    ...APP_STORES, // StoreModule.provideStore({ ...APP_STORES }),
    ToasterModule,
  ],
  providers: [
    ...APP_ACTION_HANDLERS,
    ...APP_SERVICES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
