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

  public getLastData(){
    const unique = [...new Set(SensorValueDao.SensorList.map(current => current.sensorId))];
    const listLastData =[]
    const maxDate = (dates: Date[]) => new Date(Math.max(...dates.map(Number)));
    for (const number of unique) {
      listLastData.push(
        SensorValueDao.SensorList
          .filter(finder=>finder.sensorId==number).reduce(
            function(prev, current) {
               return (prev.captureData > current.captureData) ? prev : current
            }
      ))
    }
    return listLastData
  }

  public getAvg():Array<number>{
    const unique = [...new Set(SensorValueDao.SensorList.map(current => current.sensorId))];
    const listLastData =[]
    for (const number of unique) {
      listLastData.push(
        SensorValueDao.SensorList.filter(current=>current.sensorId==number).map(target=>target.value).reduce( ( p, c ) => p + c, 0 )/SensorValueDao.SensorList.length
      )
    }
    return listLastData
  }


}
