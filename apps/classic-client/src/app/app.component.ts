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
    this.sensorTypeDao.add(new SensorType(2,"Luminosité","lux"))
    this.sensorTypeDao.add(new SensorType(3,"Humidité","%"))

    this.stationDao.add(new Station(1,"Carottes"))
    this.stationDao.add(new Station(2,"Entrée"))
    this.stationDao.add(new Station(3,"Concombre"))

    this.sensorDao.add(new Sensor(1,"capteur 1",1,1))
    this.sensorDao.add(new Sensor(2,"capteur 2",2,2))
    this.sensorDao.add(new Sensor(3,"capteur 3",1,1))
    this.sensorDao.add(new Sensor(4,"capteur 4",2,2))
    this.sensorDao.add(new Sensor(5,"capteur 5",3,2))
    this.sensorDao.add(new Sensor(6,"capteur 6",3,3))
    this.sensorDao.add(new Sensor(7,"capteur 7",1,3))
    this.sensorDao.add(new Sensor(8,"capteur 8",3,3))
    console.log(this.sensorDao.returnArray())
  }
}
