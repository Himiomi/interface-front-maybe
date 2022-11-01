import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'interface-front-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ButtonComponent{
  @Input()
  sidenav!: MatSidenav;
}
