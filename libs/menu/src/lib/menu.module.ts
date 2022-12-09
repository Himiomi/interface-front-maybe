import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleMenuComponent } from './circle-menu/circle-menu.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './button/button.component';
import { ButtonChoiceComponent } from './button-choice/button-choice.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        MatSidenavModule,
        MatDividerModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatButtonModule,
    ],
  declarations: [CircleMenuComponent, ButtonComponent, ButtonChoiceComponent],
  exports: [CircleMenuComponent, ButtonComponent, ButtonChoiceComponent],
})
export class MenuModule {}
