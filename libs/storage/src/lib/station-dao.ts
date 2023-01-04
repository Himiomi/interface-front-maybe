import {Station} from "@interface-front/entity";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StationDao {
  private static SensorList:Array<Station>=[]

  public getById(id:number):Station | undefined{
    return StationDao.SensorList.filter(current=>current.id==id)[0]
  }

  public add(sensor:Station){
    if(this.getById(sensor.id)===undefined)
      StationDao.SensorList.push(sensor)
  }

  public returnArray():Station[]{
    return StationDao.SensorList
  }

  public getListId(){
    return StationDao.SensorList.map(sensor => sensor.id)
  }

  public deleteAll(){
    StationDao.SensorList=[]
  }
}
