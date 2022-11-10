import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../model/user"
import {CrudService} from "./service/crud.service";
import {Poll} from "../model/poll";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  show = true;

  userObj: UserProfile = new UserProfile();
  userQuery: UserProfile = new UserProfile();
  userArr: UserProfile[] = [];
  queryID: number;

  addUserLogin: string = '';
  addUserPwd: string = '';
  matchResult: boolean;



  constructor(private crudService: CrudService) { }


  ngOnInit(): void {
    this.addUserLogin = '';
    this.addUserPwd = '';
    this.matchResult;
    this.userObj = new UserProfile();
    this.userArr = [];
    this.userQuery = new UserProfile();
    this.getUserList();
    this.queryUser(this.queryID);
  }

  getUserList() {
    this.crudService.getUserList().subscribe(res => {
      this.userArr = res;
    });
  }

  matchLogin(){
    this.getUserList();
    for(let user of this.userArr){
      if( (user.login === this.addUserLogin) && (user.pwd === this.addUserPwd) ) {
        this.matchResult = true;
        return;
      }
    }
    this.matchResult = false;
    return;
  }

  addPoll() {
    this.userObj.login = this.addUserLogin; //changed
    this.userObj.pwd = this.addUserPwd;

    this.crudService.addUser(this.userObj).subscribe(res => {
      this.ngOnInit();
    })
  }

  deletePoll(user: UserProfile) {
    this.crudService.deleteUser(user).subscribe(res => {
      this.ngOnInit();
    })
  }

  updateUser(user : UserProfile) {
    this.crudService.updateUser(user).subscribe(res => {
      this.ngOnInit();
    })
  }

  queryUser(iD : number){
    this.crudService.queryUser(iD).subscribe(res => {
      this.userQuery = res;
    });
  }



}
