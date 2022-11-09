import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableListComponent } from './selectable-list/selectable-list.component';
import {FormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
    imports: [CommonModule, FormsModule, MatTabsModule],
  declarations: [SelectableListComponent],
  exports: [SelectableListComponent],
})
export class UsefullModule {}
