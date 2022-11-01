import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {MenuModule} from "@interface-front/menu";
import {AboutComponent, AccountComponent, HelpComponent, SettingsComponent} from "@interface-front/different-page";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    MenuModule,

    RouterModule.forRoot(
      [
        {
          path: 'help',
          component:HelpComponent,
        },
        {
          path: 'account',
          component: AccountComponent,
        },
        {
          path: 'about',
          component: AboutComponent,
        },
        {
          path: 'setting',
          component: SettingsComponent,
        }
      ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
