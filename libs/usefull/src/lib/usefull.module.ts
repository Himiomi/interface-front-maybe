import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableListComponent } from './selectable-list/selectable-list.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  imports: [CommonModule, FormsModule, MatTabsModule, MatSortModule, MatCheckboxModule, MatTableModule],
  declarations: [SelectableListComponent, StatistiquesComponent],
  exports: [SelectableListComponent, StatistiquesComponent],
})
export class UsefullModule {}
