export class Joke {
  id:number;
  type:string
  setup:string
  punchline:string
  constructor( id:number,type:string,setup:string,punchline:string) {
    this.id=id;
    this.type=type;
    this.setup=setup;
    this.punchline=punchline;
  }
  public toString(){
    return JSON.stringify(this)
  }
}
