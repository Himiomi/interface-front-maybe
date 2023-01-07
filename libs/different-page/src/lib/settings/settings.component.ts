import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ParamDao, SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";
import {FormControl} from "@angular/forms";
import {Sensor, SensorType, SensorValue, Station} from "@interface-front/entity";

@Component({
  selector: 'interface-front-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent {
  ip=new FormControl();
  port=new FormControl();

  constructor(
    private sensorTypeDao:SensorTypeDao,
    private stationDao:StationDao,
    private sensorDao:SensorDao,
    private sensorValueDao:SensorValueDao
  ){
    this.ip=new FormControl(ParamDao.ip)
    this.port=new FormControl(ParamDao.port)
  }

  save() {
    ParamDao.ip=this.ip.value
    ParamDao.port=this.port.value
  }
  createValue(){
    this.sensorDao.deleteAll()
    this.sensorTypeDao.deleteAll()
    this.stationDao.deleteAll()
    this.sensorValueDao.deleteAll()


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
      let moment=Date.now()
      for (let j = 0; j < 300+Math.random()*50; j++) {
        moment+=((60*60*2*100)+Math.random()*30)
        this.sensorValueDao.add(new SensorValue(num,i,val,new Date(moment),0,"none"))
        val+=Math.random()*30-15;
        num++
      }
    }
  }

}
