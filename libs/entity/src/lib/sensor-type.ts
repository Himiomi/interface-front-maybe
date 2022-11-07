export class SensorType {
  get unit(): string {
    return this._unit;
  }
  get name(): string {
    return this._name;
  }
  get id(): number {
    return this._id;
  }
  private readonly _id:number
  private readonly _name:string
  private readonly _unit:string
  constructor(id:number,name:string,unit:string) {
    this._id=id
    this._name=name
    this._unit=unit
  }
  toString():string{
    return JSON.stringify(this)
  }
}
