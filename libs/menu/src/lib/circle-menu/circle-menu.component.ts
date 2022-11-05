import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BoutonCircleMenu} from "../bouton-circle-menu";

@Component({
  selector: 'interface-front-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CircleMenuComponent implements OnInit {
  buttonList: BoutonCircleMenu[] = [];
  ngOnInit(): void {
    this.buttonList.push(
      new BoutonCircleMenu('/home', 'Acceuil'),
      new BoutonCircleMenu('/account', 'Profile'),
      new BoutonCircleMenu('/setting', 'Parametres'),
      new BoutonCircleMenu('/help', 'Aide'),
      new BoutonCircleMenu('/about', 'A propos')
    );
  }
}
