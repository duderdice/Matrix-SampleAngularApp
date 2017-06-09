import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AppComponent } from './components/app/app.component';
import { APP_ACTION_HANDLERS } from './app.actionHandlers';
import { APP_COMPONENTS } from './app.components';
import { APP_ROUTES } from './app.routes';
import { APP_SERVICES } from './app.services';
import { APP_STORES } from './app.stores';

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
    StoreModule.provideStore(APP_STORES),
    ToasterModule,
  ],
  providers: [
    ...APP_ACTION_HANDLERS,
    ...APP_SERVICES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
