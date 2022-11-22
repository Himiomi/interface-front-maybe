import {Injectable} from "@angular/core";
import {Joke, Sensor} from "@interface-front/entity";
import {Snackbar} from "@interface-front/notification";

@Injectable({
  providedIn: 'root'
})
export class JokeDao {

  private static JokeList:Joke[]=[]

  public getById(id:number):Joke|undefined{
    return JokeDao.JokeList.filter(current => current.id == id)[0]
  }

  public checkById(id:number):boolean{
    return !!JokeDao.JokeList.filter(current => current.id == id).length
  }

  public add(sensor:Joke){
    if(!this.checkById(sensor.id)) {
      JokeDao.JokeList.push(sensor)
    }
  }

  public returnArray(){
    return JokeDao.JokeList
  }

  public getListId(){
    return JokeDao.JokeList.map(sensor => sensor.id)
  }

}
