import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'interface-front-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.less'],
})
export class DetailPageComponent implements OnInit {

  id!: any | null;
  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params =>
      this.id=params['id']
    )
  }
}
