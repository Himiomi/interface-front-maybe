import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'interface-front-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
