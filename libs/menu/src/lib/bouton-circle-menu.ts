export class BoutonCircleMenu {
  get name(): String {
    return this._name;
  }
  get link(): String {
    return this._link;
  }
  private readonly _link: String;
  private readonly _name: String;
  constructor(link: String, name: String) {
    this._link = link;
    this._name = name;
  }
}
