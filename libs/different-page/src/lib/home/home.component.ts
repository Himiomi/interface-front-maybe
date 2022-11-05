import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import {Router} from "@angular/router";

@Component({
  selector: 'interface-front-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less','../../../../../node_modules/keen-slider/keen-slider.min.css'],
})
export class HomeComponent {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  slider!: KeenSliderInstance

  listElement: number[] =[1,2,3]
  private router: Router;

  constructor(router:Router) {
    this.router=router
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement)
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  changePage(number: number) {
    this.router.navigateByUrl('/detail?id='+number).then(r => console.log(r) );
  }
}
