import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {MenuModule} from "@interface-front/menu";
import {
  AboutComponent,
  AccountComponent, DetailPageComponent,
  HelpComponent,
  HomeComponent,
  SettingsComponent
} from "@interface-front/different-page";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {ChartsComponent} from "@interface-front/graphics";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    MenuModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: 'help', component: HelpComponent},
        {path: 'account', component: AccountComponent},
        {path: 'about', component: AboutComponent},
        {path: 'setting', component: SettingsComponent},
        {path: 'home', component: DetailPageComponent},
        {path: 'detail', component: DetailPageComponent},
        {path: 'graphe', component: ChartsComponent}
      ]),
    MatToolbarModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
