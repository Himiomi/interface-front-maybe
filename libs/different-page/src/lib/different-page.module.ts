import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { differentPageRoutes } from './lib.routes';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { DetailPageComponent } from './detail-page/detail-page.component';
import {UsefullModule} from "@interface-front/usefull";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        IgxCarouselModule,
        IgxSliderModule,
        UsefullModule,
    ],
  declarations: [
    HelpComponent,
    AboutComponent,
    SettingsComponent,
    AccountComponent,
    HomeComponent,
    DetailPageComponent,
  ],
  exports: [
    HelpComponent,
    AboutComponent,
    SettingsComponent,
    AccountComponent,
    HomeComponent,
    DetailPageComponent,
  ],
})
export class DifferentPageModule {}
