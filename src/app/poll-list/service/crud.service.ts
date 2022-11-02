import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from '../../model/poll';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3030/polls"
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

  /*
  addUser
  delete User
  query user

  */
}
