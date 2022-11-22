import {GenericData} from "./generic-data";

export class Sensor extends GenericData{
  get stationId(): number {
    return this._stationId;
  }
  get type(): number {
    return this._type;
  }
  get name(): string {
    return this._name;
  }
  get addedDate():Date{
    return this._addedDate;
  }
  private readonly _name:string
  private readonly _type: number;
  private readonly _stationId:number;
  private readonly _addedDate:Date;
  constructor(id:number,name:string,type:number,stationId:number,addedDate:Date) {
    super(id)
    this._name=name
    this._type=type
    this._stationId=stationId
    this._addedDate=addedDate;
  }
}
