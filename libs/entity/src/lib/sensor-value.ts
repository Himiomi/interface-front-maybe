import {GenericData} from "@interface-front/entity";
import {DatePipe, formatDate} from "@angular/common";
import {Inject} from "@angular/core";

export class SensorValue extends GenericData{
  get value(): number {
    return this._value;
  }
  get captureData():Date{
    return this._captureData;
  }
  public formatedDate(){
    const format = 'hh:mm:ss dd/MM/yyyy';
    const locale = 'en-US';
    return formatDate(this.captureData,format,locale)
  }
  get sensorId():number{
    return this._sensorId;
  }
  private readonly _value: number;
  private readonly _captureData:Date;
  private readonly _sensorId:number;
  constructor(id:number,sensorId:number,value:number,captureData:Date) {
    super(id)
    this._sensorId=sensorId
    this._value=value
    this._captureData=captureData;
  }

}
