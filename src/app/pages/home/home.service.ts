import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { UserCommand } from "src/app/command/user-command"

export class HomeService {

    urlDoctor : string = "http://localhost:8081/sistema-di-prenotazioni"

    constructor(private http: HttpClient){

    }


    getUserAdmin(command : UserCommand):Observable<any>{
        return this.http.post<any>(this.urlDoctor + 'post' , command)
      }

}