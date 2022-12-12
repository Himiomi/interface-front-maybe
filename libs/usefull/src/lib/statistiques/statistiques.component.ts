import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";
import {SensorValue, SortableElements} from "@interface-front/entity";
import {MatSort, Sort} from '@angular/material/sort';
import { ViewportScroller } from '@angular/common';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'interface-front-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class StatistiquesComponent {

  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['select','numeroCapteur', 'valeur', 'dateDeCapture', 'avg','numberElements'];
  dataSource = new MatTableDataSource<SortableElements>();

  listElement:number[]=[]

  differentDao=["SensorDao","StationDao","SensorTypeDao","SensorValueDao"]
  lastData:Array<SortableElements>
  selection = new SelectionModel<SortableElements>(true, []);


  constructor(private sensorDao:SensorDao,
              private stationDao:StationDao,
              private sensorTypeDao:SensorTypeDao,
              private sensorValueDao:SensorValueDao,
              private scroller: ViewportScroller,
              private _liveAnnouncer: LiveAnnouncer,
              private router:Router) {
    this.lastData=this.sensorValueDao.getAllData()
    this.dataSource=new MatTableDataSource<SortableElements>(this.lastData)
    this.dataSource.sort = this.sort;

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.listElement=[]
      this.selection.clear();
      return;
    }
    this.listElement=this.lastData.map(current=>current.numeroCapteur)
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SortableElements): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numeroCapteur + 1}`;
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  onChange(event:SortableElements){
    if(this.listElement.indexOf(event.numeroCapteur)>-1) {
      this.listElement=this.listElement.filter(current=>current!=event.numeroCapteur)
    }else {
      this.listElement.push(event.numeroCapteur);
    }
    console.log(event.numeroCapteur);
    console.log(this.listElement)
  }

  onRegister(){
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(this.listElement);
    const navigationExtras: NavigationExtras = {queryParams};
    this.router.navigate(['/graphe'], navigationExtras);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
