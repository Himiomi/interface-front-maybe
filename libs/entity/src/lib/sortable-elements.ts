export class SortableElements {
  set numberElements(value: number) {
    this._numberElements = value;
  }
  get numberElements(): number {
    return this._numberElements;
  }
  get avg(): number {
    return this._avg;
  }

  set avg(value: number) {
    this._avg = value;
  }
  get dateDeCapture(): string {
    return this._dateDeCapture;
  }

  set dateDeCapture(value: string) {
    this._dateDeCapture = value;
  }
  get valeur(): number {
    return this._valeur;
  }

  set valeur(value: number) {
    this._valeur = value;
  }
  get numeroCapteur(): number {
    return this._numeroCapteur;
  }

  set numeroCapteur(value: number) {
    this._numeroCapteur = value;
  }
  private _numeroCapteur: number;

  private _valeur: number;

  private _dateDeCapture: string;

  private _avg: number;

  private _numberElements: number;

  constructor(numeroCapteur:number,
              valeur:number,
              dateDeCapture:string,
              avg:number,
              numberElements:number) {
    this._numberElements = numberElements;
    this._avg = parseFloat(avg.toFixed(2));
    this._dateDeCapture = dateDeCapture;
    this._valeur = valeur;
    this._numeroCapteur = numeroCapteur;
  }
}
