import {Component, OnInit} from '@angular/core';
import {SensorDao, SensorTypeDao} from "@interface-front/storage";
import {Sensor, SensorType, SensorValue, Station} from "@interface-front/entity";
import {StationDao} from "@interface-front/storage";
import {SensorValueDao} from "@interface-front/storage";
import {randomInt} from "crypto";
import { PushNotificationsService } from 'ng-push';

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
  private sensorValueDao:SensorValueDao

  constructor(private _pushNotifications: PushNotificationsService,sensorDao:SensorDao,stationDao:StationDao,sensorTypeDao:SensorTypeDao,sensorValueDao:SensorValueDao) {
    this.stationDao=stationDao
    this.sensorTypeDao=sensorTypeDao
    this.sensorDao=sensorDao
    this.sensorValueDao=sensorValueDao
  }

  ngOnInit(): void {



    this.sensorTypeDao.add(new SensorType(1,"température","°C"))
    this.sensorTypeDao.add(new SensorType(2,"Luminosité","lux"))
    this.sensorTypeDao.add(new SensorType(3,"Humidité","%"))

    this.stationDao.add(new Station(1,"Carottes"))
    this.stationDao.add(new Station(2,"Entrée"))
    this.stationDao.add(new Station(3,"Concombre"))

    this.sensorDao.add(new Sensor(1,"capteur 1",1,1,new Date()))
    this.sensorDao.add(new Sensor(2,"capteur 2",2,2,new Date()))
    this.sensorDao.add(new Sensor(3,"capteur 3",1,1,new Date()))
    this.sensorDao.add(new Sensor(4,"capteur 4",2,2,new Date()))
    this.sensorDao.add(new Sensor(5,"capteur 5",3,2,new Date()))
    this.sensorDao.add(new Sensor(6,"capteur 6",3,3,new Date()))
    this.sensorDao.add(new Sensor(7,"capteur 7",1,3,new Date()))
    this.sensorDao.add(new Sensor(8,"capteur 8",3,3,new Date()))
    let num = 0;
    for(let i=1;i<this.sensorDao.size();i++){
      let val = 0;
      for (let j = 0; j < 100; j++) {
        console.log((new Date(Date.now()+j*(60*60*2*100))).getTime())
        this.sensorValueDao.add(new SensorValue(num,i,val,new Date(Date.now()+j*(60*60*2*100))))
        val+=Math.random()*30-15;
        num++
      }
    }

  }



}
