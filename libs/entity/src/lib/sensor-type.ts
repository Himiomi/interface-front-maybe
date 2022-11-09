import {GenericData} from "./generic-data";

export class SensorType extends GenericData {
  get unit(): string {
    return this._unit;
  }
  get name(): string {
    return this._name;
  }
  private readonly _name:string
  private readonly _unit:string
  constructor(id:number,name:string,unit:string) {
    super(id)
    this._name=name
    this._unit=unit
  }
}
