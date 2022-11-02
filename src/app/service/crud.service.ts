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
    this.serviceURL = "http://localhost:3000/poll"
  }

  addPoll(poll : Poll) : Observable<Poll> {
    return this.http.post<Poll>(this.serviceURL,poll);
  }

  getPollList() : Observable<Poll[]> {
    return this.http.get<Poll[]>(this.serviceURL);
  }

  deletePoll(poll : Poll) : Observable<Poll> {
    return this.http.delete<Poll>(this.serviceURL+'/'+poll.votepoll_id);
  }

}
