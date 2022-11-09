import {GenericData} from "./generic-data";

export class Sensor extends GenericData{
  get idStation(): number {
    return this._idStation;
  }
  get idType(): number {
    return this._idType;
  }
  get name(): string {
    return this._name;
  }
  private readonly _name:string
  private readonly _idType: number;
  private readonly _idStation:number
  constructor(id:number,name:string,idType:number,idStation:number) {
    super(id)
    this._name=name
    this._idType=idType
    this._idStation=idStation
  }
}
