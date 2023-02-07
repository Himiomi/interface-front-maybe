import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Sensor, SensorType, SensorValue, Station} from "@interface-front/entity";
import {JokeDao, SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";
import {ApiService} from "@interface-front/networking";

@Component({
  selector: 'interface-front-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.less'],
})
export class DetailPageComponent implements OnInit {

  sensor: Sensor | undefined
  listId:Sensor []=[]
  listStation: Station[] | undefined;
  listStationType: SensorType[] | undefined;
  constructor(private route:ActivatedRoute,
              private sensorDao:SensorDao,
              private stationDao:StationDao,
              private sensorTypeDao:SensorTypeDao,
              private sensorValueDao:SensorValueDao,
              private jokeDao:JokeDao,
              private apiservice:ApiService){
  }


  ngOnInit(): void {
    this.sensor=this.sensorDao.getById(1)

    if(this.sensorDao.returnArray().length==0)this.listId=[]
    else this.listId=this.sensorDao.returnArray()

    this.listStation=this.stationDao.returnArray()
    this.listStationType=this.sensorTypeDao.returnArray()
  }

  testApi(){
    this.apiservice.getNewJoke();
  }

  readAll() {
    console.log(this.jokeDao.returnArray())
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
