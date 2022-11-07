export class Sensor {
  get idStation(): number {
    return this._idStation;
  }
  get idType(): number {
    return this._idType;
  }
  get name(): string {
    return this._name;
  }
  get id(): number {
    return this._id;
  }
  private readonly _id:number
  private readonly _name:string
  private readonly _idType: number;
  private readonly _idStation:number
  constructor(id:number,name:string,idType:number,idStation:number) {
    this._id=id
    this._name=name
    this._idType=idType
    this._idStation=idStation
  }
  toString():string{
    return JSON.stringify(this)
  }
}
