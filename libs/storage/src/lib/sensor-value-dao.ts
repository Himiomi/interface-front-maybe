import {Injectable} from "@angular/core";
import {Sensor, SensorValue} from "@interface-front/entity";

@Injectable({
  providedIn: 'root'
})
export class SensorValueDao {
  private static SensorList:SensorValue[]=[]

  public getById(id:number):SensorValue|undefined{
    return SensorValueDao.SensorList.filter(current => current.id == id)[0]
  }

  public checkById(id:number):boolean{
    return !!SensorValueDao.SensorList.filter(current => current.id == id).length
  }

  public add(sensor:SensorValue){
    if(!this.checkById(sensor.id))
      SensorValueDao.SensorList.push(sensor)
  }

  public returnArray(){
    return SensorValueDao.SensorList
  }

  public returnArrayOfSensor(id:number){
    const filtred = SensorValueDao.SensorList.filter(current => current.sensorId === id)
    return filtred.map(current=>([current.captureData.getTime(),current.value]))
  }
  public getListId(){
    return SensorValueDao.SensorList.map(sensor => sensor.id)
  }

}
