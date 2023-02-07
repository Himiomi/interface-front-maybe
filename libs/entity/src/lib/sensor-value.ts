import {GenericData} from "./generic-data";
import {DatePipe, formatDate} from "@angular/common";
import {Inject} from "@angular/core";

export class SensorValue extends GenericData{

  private readonly _value: number;
  private readonly _captureDate:Date;
  private readonly _stationId: number;
  private readonly _name: string;
  private readonly _sensorsId: number;

  get sensorsId(): number {
    return this._sensorsId;
  }
  get name(): string {
    return this._name;
  }
  get stationId(): number {
    return this._stationId;
  }
  get value(): number {
    return this._value;
  }
  get captureDate():Date{
    return this._captureDate;
  }
  public formatedDate(){
 //   const format = 'hh:mm:ss dd/MM/yyyy';
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    return formatDate(this.captureDate,format,locale)
  }
  constructor(id:number, sensorsId:number, value:number, captureDate:Date, stationId:number, name:string) {
    super(id)
    this._sensorsId = sensorsId;
    this._name = name;
    this._stationId = stationId;
    this._value=value
    this._captureDate=captureDate;
  }

}
