import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";
import {SensorValue, SortableElements} from "@interface-front/entity";
import {MatSort, Sort} from '@angular/material/sort';
import { ViewportScroller } from '@angular/common';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {NavigationExtras, Router} from "@angular/router";
import {ApiService} from "@interface-front/networking";
import {FormControl, FormGroup} from '@angular/forms';


declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}


@Component({
  selector: 'interface-front-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class StatistiquesComponent implements OnInit,AfterViewInit{

  @ViewChild(MatSort) sort!: MatSort;
  private mockHeaders="";
  private mockCsvData="";

  displayedColumns: string[] = ['select','numeroCapteur', 'valeur', 'dateDeCapture', 'avg','numberElements'];

  dataSource = new MatTableDataSource<SortableElements>();
  listElement:number[]=[]
  differentDao=["SensorDao","StationDao","SensorTypeDao","SensorValueDao"]
  lastData:Array<SortableElements>
  fileTitle = 'Freyr_data';
  selectControl = new FormControl();

  selection = new SelectionModel<SortableElements>(true, []);
  listPossibleNumber:number[]=[]

  selectedValue: any;


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private sensorDao:SensorDao,
              private stationDao:StationDao,
              private sensorTypeDao:SensorTypeDao,
              private sensorValueDao:SensorValueDao,
              private scroller: ViewportScroller,
              private _liveAnnouncer: LiveAnnouncer,
              private apiService:ApiService,
              private router:Router
  ) {
    this.lastData=this.sensorValueDao.getAllData()
    this.dataSource=new MatTableDataSource<SortableElements>(this.lastData)
    this.dataSource.sort = this.sort;
    this.refreshArray()
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  ngOnInit(){
    this.refreshArray()
  }
  ngAfterViewInit(){
    this.refreshArray()
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

  getSelection(){
    return this.selection.selected.map(current=>current.numeroCapteur)
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

  onRegister(){
    this.router.navigate(['/graphe'],
      { queryParams:
          {
            myArray: JSON.stringify(this.selection.selected.map(current=>current.numeroCapteur)),
            dateStart: this.range.value.start,
            dateEnd: this.range.value.end
          }
      });
  }

  refreshArray() {
    this.lastData=this.sensorValueDao.getAllData()
    this.dataSource=new MatTableDataSource<SortableElements>(this.lastData)
    this.dataSource.sort = this.sort;
    this.listPossibleNumber=this.lastData.map(current=>current.numeroCapteur)
  }
  getSensor() {
    this.apiService.getAllSensor()
  }

  getSensorValue() {
    this.apiService.getAllReading()
  }
//###################################################################################

  convertToCSV(items: Array<any>) {
    if (!items.length) return '';
    const separator=","
    const columns = Object.keys(items[0]).join(separator);
    const body = items.map(item =>
      Object.values(item).join(separator)
    ).join('\n');
    return columns + '\n' + body;
  }

  formatToCsvData(data:any) {
    const csv = this.convertToCSV(data);
    this.mockCsvData =  this.mockHeaders + csv;
  }

  download(data:any){
    this.formatToCsvData(data)
    const exportedFilenmae = this.fileTitle + '.csv';
    const blob = new Blob([this.mockCsvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  downloadSortableValue() {
    this.download(this.lastData)
  }

  isSelected(num:number){
    return this.listElement.includes(num)
  }

  debug() {
    console.log(this.range.value.start)
    console.log(this.range.value.end)
  }
}
