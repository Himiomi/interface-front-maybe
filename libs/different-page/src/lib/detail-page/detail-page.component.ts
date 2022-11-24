import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Sensor, SensorType, Station} from "@interface-front/entity";
import {JokeDao, SensorDao, SensorTypeDao, StationDao} from "@interface-front/storage";
import {ApiService} from "@interface-front/networking";
import {SnackBarService} from "@interface-front/notification";

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


}
