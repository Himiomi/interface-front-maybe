import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Sensor, SensorType, Station} from "@interface-front/entity";
import {JokeDao, SensorDao, SensorTypeDao, StationDao} from "@interface-front/storage";
import {ApiService} from "@interface-front/networking";
import {SnackBarService} from "@interface-front/notification";
import {PushNotification, PushNotificationsService} from "ng-push";

@Component({
  selector: 'interface-front-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.less'],
})
export class DetailPageComponent implements OnInit {

  id!: any | null;
  sensor: Sensor | undefined
  listId:Sensor []=[]
  listStation: Station[] | undefined;
  listStationType: SensorType[] | undefined;
  constructor(private route:ActivatedRoute,
              private sensorDao:SensorDao,
              private stationDao:StationDao,
              private sensorTypeDao:SensorTypeDao,
              private jokeDao:JokeDao,
              private apiservice:ApiService,
              private _pushNotifications: PushNotificationsService){
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe( params =>
      this.id=params['id']
    )
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

    //our function to be called on click
    const options= {
      //set options
      sticky: true,
      icon:
        'https://www.esiea.fr/wp-content/uploads/sites/2/2022/03/logo-esiea.svg',
      body: 'Une super notification de message'
    };
    this._pushNotifications.create('Freyr a un message', options).subscribe(
      //creates a notification
      (res:any) => console.log(res),
        (err: any) => {
        console.log(err)
          this._pushNotifications.requestPermission()
      }
    );
  }


}
