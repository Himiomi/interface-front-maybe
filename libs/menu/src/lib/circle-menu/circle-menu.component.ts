import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BoutonCircleMenu} from "../bouton-circle-menu";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'interface-front-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.less'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class CircleMenuComponent implements OnInit {
  buttonList: BoutonCircleMenu[] = [];
  ngOnInit(): void {
    this.buttonList.push(
      new BoutonCircleMenu('/account', 'Profile'),
      new BoutonCircleMenu('/setting', 'Parametres'),
      new BoutonCircleMenu('/help', 'Aide'),
      new BoutonCircleMenu('/about', 'A propos')
    );
  }
}
