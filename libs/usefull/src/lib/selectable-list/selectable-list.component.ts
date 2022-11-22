import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {GenericData, Sensor} from "@interface-front/entity";
import {SensorDao, SensorTypeDao, StationDao} from "@interface-front/storage";
import {NavigationExtras, Router} from "@angular/router";


class elementOfList{
  id:number;
  value:Sensor;
  isSelected:boolean;
  constructor(id:number,value:Sensor,isSelected:boolean) {
    this.id=id;
    this.value=value;
    this.isSelected=isSelected;
  }
}

@Component({
  selector: 'interface-front-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectableListComponent implements OnChanges {
  name = 'Angular';
  masterSelected: boolean;
  checklist: elementOfList[] = [];
  checkedList: any;
  @Input()
  listObject!: Sensor[];
  @Input()
  test!: number;

  differentStation=new Map<number,boolean>()
  differentCategorie=new Map<number,boolean>()

  differentStationState:boolean[]=[]
  differentCategorieState:boolean[]=[]

  constructor(private sensorTypeDao:SensorTypeDao,private stationDao:StationDao,private router:Router) {
    this.masterSelected = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.masterSelected = false;
    if (this.listObject === undefined) {
      this.checklist = []
    } else {
      for (let i = 0; i < this.listObject.length; i++) {
        this.checklist.push(
          new elementOfList(
            this.listObject[i].id,
            this.listObject[i],
            false
          )
        )
      }
    }
    const uniqueStationId = [...new Set(this.listObject.map((current) => current.stationId))]
    for (let i = 0; i < uniqueStationId.length; i++) {
      this.differentStation.set(uniqueStationId[i],false)
      this.differentStationState.push(false)
    }
    const uniqueCategorieId = [...new Set(this.listObject.map((current) => current.type))]
    for (let i = 0; i < uniqueCategorieId.length; i++) {
      this.differentCategorie.set(uniqueCategorieId[i],false)
      this.differentCategorieState.push(false)
    }
    console.log(uniqueStationId)
    console.log(uniqueCategorieId)
    this.getCheckedItemList();
    }


  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (let i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    for (let i = 0; i < this.differentStationState.length; i++) {
      this.differentStationState[i]=this.masterSelected
    }
    for (let i = 0; i < this.differentCategorieState.length; i++) {
      this.differentCategorieState[i]=this.masterSelected
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected(valeur:number) {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();

    const newlist = this.checklist.filter(current => current.value.stationId == valeur)
    this.differentStationState[valeur]=newlist.every(function (item: any) {
      return item.isSelected == true;
    });
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (let i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i].id);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
  onRegister(){
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify(this.checklist.filter(current=>current.isSelected).map(current2=>current2.id));
    const navigationExtras: NavigationExtras = {queryParams};
    this.router.navigate(['/graphe'], navigationExtras);
  }
  filtreStation(param:number){
    return this.checklist.filter(current => current.value.stationId==param)
  }
  filtreType(param:number){
    return this.checklist.filter(current => current.value.type==param)
  }

  getNameStation(param:number){
    return this.stationDao.getById(param)?.name
  }

  getNameType(param:number){
    return this.sensorTypeDao.getById(param)?.name
  }

  checkUncheckAllStation(param:number) {
    const newlist = this.checklist.filter(current => current.value.stationId == param)
    for (let i = 0; i < newlist.length; i++) {
      newlist[i].isSelected = this.differentStationState[param];
    }
    this.getCheckedItemList()
  }

  checkUncheckAllType(param:number){
    const newlist = this.checklist.filter(current => current.value.type == param)
    for (let i = 0; i < newlist.length; i++) {
      newlist[i].isSelected = this.differentCategorieState[param];
    }
    this.getCheckedItemList()
  }

  getIdStation(){
    const newlist:number[]=[]
    this.differentStation.forEach((value,index)=>{newlist.push(index)})
    return newlist
  }

  getIdCategorie(){
    const newlist:number[]=[]
    this.differentCategorie.forEach((value,index)=>{newlist.push(index)})
    return newlist
  }

}
