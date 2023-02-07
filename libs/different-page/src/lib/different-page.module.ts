import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { UsefullModule } from '@interface-front/usefull';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { VitrineComponent } from './vitrine/vitrine.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    IgxCarouselModule,
    IgxSliderModule,
    UsefullModule,
    HttpClientModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  declarations: [
    HelpComponent,
    AboutComponent,
    SettingsComponent,
    AccountComponent,
    HomeComponent,
    DetailPageComponent,
    VitrineComponent,
  ],
    exports: [
        HelpComponent,
        AboutComponent,
        SettingsComponent,
        AccountComponent,
        HomeComponent,
        DetailPageComponent,
        VitrineComponent,
    ],
  bootstrap: [HelpComponent],
})
export class DifferentPageModule {}
