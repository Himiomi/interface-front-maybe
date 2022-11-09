import {GenericData} from "./generic-data";

export class Environnement extends GenericData{
  get name(): string {
    return this._name;
  }
  private readonly _name:string
  constructor(id:number,name:string) {
    super(id)
    this._name=name
  }
}
