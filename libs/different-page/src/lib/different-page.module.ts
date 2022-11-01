import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { differentPageRoutes } from './lib.routes';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HelpComponent,
    AboutComponent,
    SettingsComponent,
    AccountComponent,
  ],
  exports: [HelpComponent, AboutComponent, SettingsComponent, AccountComponent],
})
export class DifferentPageModule {}
