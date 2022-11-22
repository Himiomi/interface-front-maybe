import {GenericData} from "@interface-front/entity";

export class SensorValue extends GenericData{
  get value(): number {
    return this._value;
  }
  get captureData():Date{
    return this._captureData;
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
