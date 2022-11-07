import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'interface-front-selectable-list',
  templateUrl: './selectable-list.component.html',
  styleUrls: ['./selectable-list.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectableListComponent implements OnChanges {
  name = 'Angular';
  masterSelected: boolean;
  checklist: any[] = [];
  checkedList: any;
  @Input()
  listObject!: any[];
  @Input()
  test!: number;

  constructor() {
    this.masterSelected = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.masterSelected = false;
    console.log("chaque objet")
    if (this.listObject === undefined) {
      this.checklist = []
    } else {
      for (let i = 0; i < this.listObject[0].length; i++) {
        this.checklist.push({id:this.listObject[0][i].id , value: this.listObject[0][i].toString(), isSelected: false})
      }
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
    alert("graphique des capteurs numéros "+this.checklist.filter(current=>current.isSelected).map(current2=>current2.id))
  }

}
