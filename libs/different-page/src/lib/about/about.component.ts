import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'interface-front-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
