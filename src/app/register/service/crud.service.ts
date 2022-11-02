import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/users"
  }


  getUserList() : Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }
  getUser() : Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }

  addUser(user : User) : Observable<User> {
    return this.http.post<User>(this.serviceURL,user);
  }

  deleteUser(user : User) : Observable<User> {
    return this.http.delete<User>(this.serviceURL+'/'+user.id);
  }

  updateUser(user : User) : Observable<User> {
    return this.http.put<User>(this.serviceURL+'/'+user.id,user);
  }

  /*
  addUser
  delete User
  query user

  */
}
