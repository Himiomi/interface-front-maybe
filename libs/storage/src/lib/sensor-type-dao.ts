import {Injectable} from "@angular/core";
import {Sensor, SensorType} from "@interface-front/entity";

@Injectable({
  providedIn: 'root'
})
export class SensorTypeDao {

  private static SensorList:SensorType[]=[]

  public getById(id:number):SensorType | undefined{
    return SensorTypeDao.SensorList.filter(current=>current.id==id)[0]
  }

  public add(sensor:SensorType){
    if(this.getById(sensor.id)===undefined)
      SensorTypeDao.SensorList.push(sensor)
  }

  public returnArray(){
    return SensorTypeDao.SensorList
  }

  public getListId(){
    return SensorTypeDao.SensorList.map(sensor => sensor.id)
  }

  public deleteAll(){
    SensorTypeDao.SensorList=[]
  }

}
