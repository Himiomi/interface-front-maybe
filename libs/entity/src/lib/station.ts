export class Station {
  get name(): string {
    return this._name;
  }
  get id(): number {
    return this._id;
  }
  private readonly _id:number
  private readonly _name:string
  constructor(id:number,name:string) {
    this._id=id
    this._name=name
  }
  toString():string{
    return JSON.stringify(this)
  }
}
