import {Injectable} from "@angular/core";
import {Sensor, SensorValue, SortableElements} from "@interface-front/entity";

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

  public returnArrayOfSensor(id:number,dateStart:Date,dateEnd:Date){
    console.log(SensorValueDao.SensorList.length)
    const filtred = SensorValueDao.SensorList
      .filter(current => current.sensorsId === id)
      .filter(current => current.captureDate>=dateStart)
      .filter(current => current.captureDate<=dateEnd)
    return filtred.map(current=>([current.captureDate.getTime(),current.value]))
  }
  public getListId(){
    return SensorValueDao.SensorList.map(sensor => sensor.id)
  }

  public getLastData(){
    const unique = [...new Set(SensorValueDao.SensorList.map(current => current.sensorsId))];
    const listLastData =[]
    const maxDate = (dates: Date[]) => new Date(Math.max(...dates.map(Number)));
    for (const number of unique) {
      listLastData.push(
        SensorValueDao.SensorList
          .filter(finder=>finder.sensorsId==number).reduce(
            function(prev, current) {
               return (prev.captureDate > current.captureDate) ? prev : current
            }
      ))
    }
    return listLastData
  }

  public getAvg():Array<number>{
    const unique = [...new Set(SensorValueDao.SensorList.map(current => current.sensorsId))];
    const listLastData =[]
    for (const number of unique) {
      listLastData.push(
        SensorValueDao.SensorList.filter(current=>current.sensorsId==number).map(target=>target.value).reduce( ( p, c ) => p + c, 0 )/SensorValueDao.SensorList.length
      )
    }
    return listLastData
  }

  public numberOfCaptur():Array<number>{
    const unique = [...new Set(SensorValueDao.SensorList.map(current => current.sensorsId))];
    const listLastData =[]
    for (const number of unique) {
      listLastData.push(
        SensorValueDao.SensorList.filter(current=>current.sensorsId==number).length
      )
    }
    return listLastData
  }

  public getAllData():Array<SortableElements>{
    const lastData = this.getLastData()
    const avg=this.getAvg()
    const size=this.numberOfCaptur()
    const finalArray:Array<SortableElements>=new Array<SortableElements>()
    let currentElement;
    for (let i = 0; i < lastData.length; i++) {
      currentElement = lastData[i]
      finalArray.push(
        new SortableElements(
          currentElement.sensorsId,
          currentElement.value,
          currentElement.formatedDate(),
          avg[i],
          size[i]
        )
      )
    }
    return finalArray;
  }

  public getSensorValueBySensorId(id:number){
    return SensorValueDao.SensorList.filter(current=>current.sensorsId==id)
  }

  public deleteAll(){
    SensorValueDao.SensorList=[]
  }

}
