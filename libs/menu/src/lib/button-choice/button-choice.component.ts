import {Component, Input} from '@angular/core';
import {BoutonCircleMenu} from "../bouton-circle-menu";

@Component({
  selector: 'interface-front-button-choice',
  templateUrl: './button-choice.component.html',
  styleUrls: ['./button-choice.component.less'],
})
export class ButtonChoiceComponent  {
  @Input()
  buttonList!: BoutonCircleMenu[];
}
