import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

// borrowed from => http://www.cssportal.com/css-ribbon-generator/

@Component({
    selector: 'app-mocking-ribbon',
    template: `
        <div *ngIf="isMocking">
            <div class="ribbon"><span>Mocking</span></div>
        </div>
  `,
    styles: [`
        .ribbon {
            position: absolute;
            left: -5px; top: -5px;
            z-index: 1;
            overflow: hidden;
            width: 75px; height: 75px;
            text-align: right;
        }
        .ribbon span {
            font-size: 10px;
            font-weight: bold;
            color: #FFF;
            text-transform: uppercase;
            text-align: center;
            line-height: 20px;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            width: 100px;
            display: block;
            background: #79A70A;
            background: linear-gradient(#F70505 0%, #8F0808 100%);
            box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
            position: absolute;
            top: 19px; left: -21px;
        }
        .ribbon span::before {
            content: "";
            position: absolute; left: 0px; top: 100%;
            z-index: -1;
            border-left: 3px solid #8F0808;
            border-right: 3px solid transparent;
            border-bottom: 3px solid transparent;
            border-top: 3px solid #8F0808;
        }
        .ribbon span::after {
            content: "";
            position: absolute; right: 0px; top: 100%;
            z-index: -1;
            border-left: 3px solid transparent;
            border-right: 3px solid #8F0808;
            border-bottom: 3px solid transparent;
            border-top: 3px solid #8F0808;
        }
  `],
})
export class MockingRibbonComponent {

    private isMocking: boolean = environment.useMocking;

}
