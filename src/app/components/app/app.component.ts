import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title: string = 'app';
  private toasterconfig: ToasterConfig = new ToasterConfig({ showCloseButton: true });

}
