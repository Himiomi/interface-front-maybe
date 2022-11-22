import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BoutonCircleMenu} from "../bouton-circle-menu";
import {SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";

@Component({
  selector: 'interface-front-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CircleMenuComponent implements OnInit {
  buttonList: BoutonCircleMenu[] = [];

  constructor(private sensorDao:SensorDao,private stationDao:StationDao,private sensorTypeDao:SensorTypeDao,private sensorValueDao:SensorValueDao) {
    this.stationDao=stationDao
    this.sensorTypeDao=sensorTypeDao
    this.sensorDao=sensorDao
    this.sensorValueDao=sensorValueDao
  }
  ngOnInit(): void {
    this.buttonList.push(
      new BoutonCircleMenu('/home', 'Acceuil'),
      new BoutonCircleMenu('/account', 'Profile'),
      new BoutonCircleMenu('/setting', 'Parametres'),
      new BoutonCircleMenu('/help', 'Aide'),
      new BoutonCircleMenu('/about', 'A propos')
    );
  }

  displayAllDao() {
    console.log("Sensors :")
    console.log(this.sensorDao.returnArray())
    console.log("Stations :")
    console.log(this.stationDao.returnArray())
    console.log("Types :")
    console.log(this.sensorTypeDao.returnArray())
    console.log("SensorValue :")
    console.log(this.sensorValueDao.returnArrayOfSensor(1))
  }
}
