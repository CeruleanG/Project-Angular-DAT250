import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = '/users'
  }


  getUserList() : Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.serviceURL);
  }
  getUser() : Observable<UserProfile[]> {
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

}
