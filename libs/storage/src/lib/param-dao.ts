import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ParamDao {
  static get ip(): string {
    return this._ip;
  }

  static set ip(value: string) {
    this._ip = value;
  }
  static get port(): number {
    return this._port;
  }

  static set port(value: number) {
    this._port = value;
  }
  private static _ip="localhost"
  private static _port=443

}
