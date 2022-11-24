import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectableListComponent } from './selectable-list/selectable-list.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
    imports: [CommonModule, FormsModule, MatTabsModule, MatSortModule],
  declarations: [SelectableListComponent, StatistiquesComponent],
  exports: [SelectableListComponent, StatistiquesComponent],
})
export class UsefullModule {}
