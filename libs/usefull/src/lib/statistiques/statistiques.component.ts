import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";
import {SortableElements} from "@interface-front/entity";
import {MatSort, Sort} from '@angular/material/sort';
import {ViewportScroller} from '@angular/common';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from '@angular/cdk/collections';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Router} from "@angular/router";
import {ApiService} from "@interface-front/networking";
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from "rxjs";


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
  //CSV
  private mockHeaders="";
  private mockCsvData="";
  fileTitle = 'Freyr_data';

  selectedSensor:number[]=[]

  displayedColumns: string[] = ['select','numeroCapteur', 'valeur', 'dateDeCapture', 'avg','numberElements'];
  dataSource = new MatTableDataSource<SortableElements>();
  listElement:number[]=[]
  lastData:Array<SortableElements>
  listPossibleNumber:number[]=[]

  selectNumber!: number;
  targetNumber=new FormControl();

  selectControl = new FormControl();

  selection = new SelectionModel<SortableElements>(true, []);

  selectComparaison: any;

  selectColomn= new FormControl(this.displayedColumns[0]);

  selectedValue: any;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  targetDate = new FormControl();

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
    this.selectColomn.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(()=>{
        this.selectComparaison = null;
        this.targetNumber = new FormControl();
      }
    )

  }

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

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.listElement=[]
      this.selection.clear();
      return;
    }
    this.listElement=this.lastData.map(current=>current.numeroCapteur)
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: SortableElements): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numeroCapteur + 1}`;
  }
  getSelection(){
    return this.selection.selected.map(current=>current.numeroCapteur)
  }

  announceSortChange(sortState: Sort) {
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
            myArray: JSON.stringify(this.selectedSensor),
            dateStart: this.range.value.start,
            dateEnd: this.range.value.end
          }
      });
  }
  onRegisterSelection(){
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
    this.selectNumber=this.listPossibleNumber[0]
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
    console.log(body)
    return columns + '\n' + body;
  }

  formatToCsvData(data:any) {
    const csv = this.convertToCSV(data);
    this.mockCsvData =  this.mockHeaders + csv;
  }

  download(data:any){
    console.log("download...")
    console.log(data)
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

  downloadSensorById() {
    this.download(this.sensorValueDao.getSensorValueBySensorId(this.selectNumber))
  }

  filtre() {
 //   this.lastData=this.sensorValueDao.getAllData()
    console.log(this.selectComparaison)
    console.log(this.targetNumber.value)
    console.log(this.targetDate.value)
    if(this.selectColomn.value===this.displayedColumns[1]) {
      if (this.selectComparaison === '<') this.lastData = this.lastData.filter(current => current.numeroCapteur < this.targetNumber.value)
      if (this.selectComparaison === '>') this.lastData = this.lastData.filter(current => current.numeroCapteur > this.targetNumber.value)
      if (this.selectComparaison === '=') this.lastData = this.lastData.filter(current => current.numeroCapteur == this.targetNumber.value)
    }
    else if(this.selectColomn.value===this.displayedColumns[2]) {
      if (this.selectComparaison === '<') this.lastData = this.lastData.filter(current => current.valeur < this.targetNumber.value)
      if (this.selectComparaison === '>') this.lastData = this.lastData.filter(current => current.valeur > this.targetNumber.value)
      if (this.selectComparaison === '=') this.lastData = this.lastData.filter(current => current.valeur == this.targetNumber.value)
    }
    else if(this.selectColomn.value===this.displayedColumns[3]) {
      if (this.selectComparaison === '<') this.lastData = this.lastData.filter(current => new Date(current.dateDeCapture) < this.targetDate.value)
      if (this.selectComparaison === '>') this.lastData = this.lastData.filter(current => new Date(current.dateDeCapture) > this.targetDate.value)
      if (this.selectComparaison === '=') this.lastData = this.lastData.filter(current => new Date(current.dateDeCapture) == this.targetDate.value)
    }
    else if(this.selectColomn.value===this.displayedColumns[4]) {
      if (this.selectComparaison === '<') this.lastData = this.lastData.filter(current => current.avg < this.targetNumber.value)
      if (this.selectComparaison === '>') this.lastData = this.lastData.filter(current => current.avg > this.targetNumber.value)
      if (this.selectComparaison === '=') this.lastData = this.lastData.filter(current => current.avg == this.targetNumber.value)
    }
    else if(this.selectColomn.value===this.displayedColumns[5]) {
      if (this.selectComparaison === '<') this.lastData = this.lastData.filter(current => current.numberElements < this.targetNumber.value)
      if (this.selectComparaison === '>') this.lastData = this.lastData.filter(current => current.numberElements > this.targetNumber.value)
      if (this.selectComparaison === '=') this.lastData = this.lastData.filter(current => current.numberElements == this.targetNumber.value)
    }
    this.dataSource=new MatTableDataSource<SortableElements>(this.lastData)
    this.dataSource.sort = this.sort;
    this.listPossibleNumber=this.lastData.map(current=>current.numeroCapteur)
    this.selectNumber=this.listPossibleNumber[0]
  }

  deleteFiltres() {
    this.refreshArray()
  }

  saveSensor() {
    this.selection.selected.map(current=>current.numeroCapteur)
      .forEach(current=>this.selectedSensor.push(current))
      this.selectedSensor= this.selectedSensor.filter(
        (thing, i, arr) => arr.findIndex(t => t === thing) === i
      );
  }

  deleteSelection() {
    this.selectedSensor=[]
  }
}
