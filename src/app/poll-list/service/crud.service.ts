import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from '../../model/poll';
import { environment } from 'src/environments/environment';
import {UserProfile} from "../../model/user";


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = `${environment.apiUrl}/polls`
  }


  getPollList() : Observable<Poll[]> {
    return this.http.get<Poll[]>(this.serviceURL);
  }

  addPoll(poll : Poll) : Observable<Poll> {
    return this.http.post<Poll>(this.serviceURL,poll);
  }

  deletePoll(poll : Poll) : Observable<Poll> {
    return this.http.delete<Poll>(this.serviceURL+'/'+poll.id);
  }

  updatePoll(poll : Poll) : Observable<Poll> {
    return this.http.put<Poll>(this.serviceURL+'/'+poll.id,poll);
  }

  /*trial for querying a poll*/
  /*queryPoll (poll : Poll) :Observable<Poll> {
   return this.http.get<Poll>(this.serviceURL+'/'+poll.id);
  }*/
  queryPoll (iD : number) :Observable<Poll> {
    return this.http.get<Poll>(this.serviceURL+'/'+iD);
  }
  queryUser (iD : number) :Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiUrl}/users`+'/'+iD);
  }

  /*
  addUser
  delete User
  query user

  */
}
