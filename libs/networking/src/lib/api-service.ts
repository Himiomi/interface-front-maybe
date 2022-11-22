import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Joke} from "@interface-front/entity";
import {JokeDao} from "@interface-front/storage";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http:HttpClient,private jokeDao:JokeDao) {}

  public getNewJoke(): void {
    let joke
    this.http.get<Joke>("https://official-joke-api.appspot.com/random_joke")
      .subscribe(
        (read=>{
          joke=read
            console.log(joke.punchline+" "+joke.type+" "+joke.setup+" "+joke.id);
          this.jokeDao.add(joke);
        }
        )
      );
  }

}
