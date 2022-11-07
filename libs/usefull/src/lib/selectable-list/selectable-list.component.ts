import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Sensor} from "@interface-front/entity";

@Component({
  selector: 'interface-front-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectableListComponent  {
  name = 'Angular';
  masterSelected: boolean;
  checklist: any[]=[];
  checkedList: any;
  @Input()
  listObject!:any[];
  @Input()
  test!:any;

  constructor() {
    console.log("test: "+this.test)
    this.masterSelected = false;
    console.log(this.listObject)
    if(this.listObject===undefined){
      this.checklist=[]
    }else {
      this.listObject.forEach(
        (value, index) => {
          this.checklist.push({id: index, value: value.toString(), comment: '', isSelected: false})
        }
      )
    }
    this.getCheckedItemList();
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (let i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (let i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
  onRegister(){
    console.log('data to be saved',this.checkedList);
  }

}
