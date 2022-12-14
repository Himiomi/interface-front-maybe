import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {BoutonCircleMenu} from "../bouton-circle-menu";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'interface-front-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.less']
})
export class CircleMenuComponent implements OnInit {
  buttonList: BoutonCircleMenu[] = [];

  isMobile=false
  mobileWidth = 760;
  innerWidth: number=window.innerWidth;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buttonList.push(
      new BoutonCircleMenu('/home', 'Acceuil'),
      new BoutonCircleMenu('/setting', 'Parametres'),
      new BoutonCircleMenu('/help', 'Aide'),
      new BoutonCircleMenu('/about', 'A propos')
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<=this.mobileWidth)this.isMobile=true
    else this.isMobile=false
  }

  toPage(param: String) {
    this.router.navigate([param]);
  }
}
