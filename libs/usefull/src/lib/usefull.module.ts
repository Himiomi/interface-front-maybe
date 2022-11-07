import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableListComponent } from './selectable-list/selectable-list.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
  declarations: [SelectableListComponent],
  exports: [SelectableListComponent],
})
export class UsefullModule {}
