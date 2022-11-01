import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'interface-front-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
