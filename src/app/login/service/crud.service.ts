import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserProfile} from "../../model/user"
import { environment } from 'src/environments/environment';
import {Poll} from "../../model/poll";


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = `${environment.apiUrl}/users`
  }


  getUserList() : Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.serviceURL);
  }

  addUser(user : UserProfile) : Observable<UserProfile> {
    return this.http.post<UserProfile>(this.serviceURL,user);
  }

  deleteUser(user : UserProfile) : Observable<UserProfile> {
    return this.http.delete<UserProfile>(this.serviceURL+'/'+user.id);
  }

  updateUser(user : UserProfile) : Observable<UserProfile> {
    return this.http.put<UserProfile>(this.serviceURL+'/'+user.id,user);
  }

  /*trial for querying a poll*/
  /*queryPoll (poll : Poll) :Observable<Poll> {
   return this.http.get<Poll>(this.serviceURL+'/'+poll.id);
  }*/
  queryUser (iD : number) :Observable<UserProfile> {
    return this.http.get<UserProfile>(this.serviceURL+'/'+iD);
  }
  queryPoll (iD : number) :Observable<Poll> {
    return this.http.get<Poll>( `${environment.apiUrl}/polls/`+iD);
  }


}
