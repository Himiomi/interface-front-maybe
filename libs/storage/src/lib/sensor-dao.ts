import {Sensor} from "@interface-front/entity";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SensorDao {
  private static SensorList:Sensor[]=[]

  public getById(id:number):Sensor|undefined{
    return SensorDao.SensorList.filter(current => current.id == id)[0]
  }

  public checkById(id:number):boolean{
    return !!SensorDao.SensorList.filter(current => current.id == id).length
  }

  public add(sensor:Sensor){
    if(!this.checkById(sensor.id))
      SensorDao.SensorList.push(sensor)
  }

  public returnArray(){
    return SensorDao.SensorList
  }

  public getListId(){
    return SensorDao.SensorList.map(sensor => sensor.id)
  }

  public size():number{
    return SensorDao.SensorList.length
  }

}
