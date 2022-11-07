import {Component, OnInit} from '@angular/core';
import {SensorDao, SensorTypeDao} from "@interface-front/storage";
import {Sensor, SensorType, Station} from "@interface-front/entity";
import {StationDao} from "@interface-front/storage";

@Component({
  selector: 'interface-front-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit{
  title = 'classic-client';
  private sensorDao: SensorDao;
  private stationDao:StationDao
  private sensorTypeDao:SensorTypeDao
  constructor(sensorDao:SensorDao,stationDao:StationDao,sensorTypeDao:SensorTypeDao) {
    this.stationDao=stationDao
    this.sensorTypeDao=sensorTypeDao
    this.sensorDao=sensorDao
  }

  ngOnInit(): void {
    this.sensorTypeDao.add(new SensorType(1,"température","°C"))

    this.stationDao.add(new Station(1,"Potager"))

    this.sensorDao.add(new Sensor(1,"Premier",1,1))
    this.sensorDao.add(new Sensor(2,"Deuxieme",1,1))
    this.sensorDao.add(new Sensor(3,"Courgette",1,1))
    this.sensorDao.add(new Sensor(4,"Entrée",1,1))
    this.sensorDao.add(new Sensor(5,"Extérieur",1,1))
    this.sensorDao.add(new Sensor(6,"Tomate",1,1))
    console.log(this.sensorDao.returnArray())
  }
}
