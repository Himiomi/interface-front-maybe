import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts/charts.component';
import {IgxFinancialChartCoreModule} from "igniteui-angular-charts";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  imports: [CommonModule, IgxFinancialChartCoreModule, NgApexchartsModule],
  declarations: [ChartsComponent],
  exports: [ChartsComponent],
})
export class GraphicsModule {}
