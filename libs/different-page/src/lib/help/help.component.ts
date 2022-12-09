import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

class elementAccordion {
  get titre(): string {
    return this._titre;
  }
  get content(): string {
    return this._content;
  }
  private _titre: string;

  private _content: string;

  constructor(titre:string, content:string) {
    this._content = content;
    this._titre = titre;
  }
}

@Component({
  selector: 'interface-front-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HelpComponent {
  panelOpenState = false;
  listElements:Array<elementAccordion>=new Array<elementAccordion>();
  constructor() {
    this.listElements.push(
      new elementAccordion("Un super titre","du contenu"),
      new elementAccordion("2eme titre","et encore du contenu")
    )
  }
}
