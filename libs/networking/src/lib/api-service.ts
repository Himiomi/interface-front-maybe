import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http"
import {Injectable} from "@angular/core";
import {Joke, Sensor, SensorValue} from "@interface-front/entity";
import {JokeDao, ParamDao, SensorDao, SensorTypeDao, SensorValueDao, StationDao} from "@interface-front/storage";
import * as Buffer from "Buffer";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http:HttpClient,
               private jokeDao:JokeDao,
               private sensorDao:SensorDao,
               private stationDao:StationDao,
               private sensorTypeDao:SensorTypeDao,
               private sensorValueDao:SensorValueDao
  ){}
  public getNewJoke(): void {
    let joke
    this.http.get<Joke>("https://official-joke-api.appspot.com/random_joke")
      .subscribe(
        (read=>{
            joke=read
            console.log(joke.punchline+" "+joke.type+" "+joke.setup+" "+joke.id);
            this.jokeDao.add(joke);
          }
        )
      );
  }
  public getAllSensor(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + Buffer.Buffer.from("projet:freyr", 'binary').toString('base64')
    });

    let sensor:Array<Sensor>
    console.log(this.http.get<Array<Sensor>>("https://"+ParamDao.ip+":"+ParamDao.port+"/sensor",{headers:headers})
      .subscribe(
        (read=>{
            sensor=read
            sensor.forEach(current=>{
              this.sensorDao.add(new Sensor(current.id,
                current.name,
                current.type,
                current.stationId,
                current.addedDate)
              )
              console.log(sensor)
            })
          }
        )
      ));
  }
  public getAllReading(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + Buffer.Buffer.from("projet:freyr", 'binary').toString('base64')
    });

    let sensor:Array<SensorValue>
    this.http.get<Array<SensorValue>>("https://"+ParamDao.ip+":"+ParamDao.port+"/data",{headers:headers})
      .subscribe(
        (read=>{
            sensor=read
            let val=0;
            console.log(sensor[0])
            console.log(sensor[1])
            sensor.forEach(current=>{
              val++;
              console.log(current.captureDate)
              this.sensorValueDao.add(
                new SensorValue(
                  val,
                  current.sensorsId,
                  current.value,
                  new Date(current.captureDate),
                  current.stationId,
                  current.name
                )
              )
            })
          }
        )
      );
  }
}
