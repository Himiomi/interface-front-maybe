export class GenericData {
  get id(): number {
    return this._id;
  }
  private readonly _id:number
  constructor(id:number) {
    this._id=id
  }
  toString():string{
    return JSON.stringify(this)
  }
}
