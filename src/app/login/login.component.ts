import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../model/user"
import {CrudService} from "./service/crud.service";
import {Poll} from "../model/poll";
import {Router} from "@angular/router";

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
  idFound: number;
  queryID: number;

  addUserLogin: string = '';
  addUserPwd: string = '';
  guestParticipate: number;

  teststring: string;
  testStringGuest: string;


  constructor(private crudService: CrudService,private router: Router) { }


  ngOnInit(): void {
    this.addUserLogin = '';
    this.addUserPwd = '';
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
        this.idFound = user.id;
        this.router.navigateByUrl("/user/"+user.id);
        return;
      }
    }
    this.teststring = "Username or Password incorrect";
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

  guestVote(){
    const iD: number = Number(this.guestParticipate);
    this.crudService.queryPoll(iD).subscribe(res => {
      this.testStringGuest = "Been here";
      if (res.id == -1) {
        //error for not found poll
        this.testStringGuest = "poll not found: id=" + res.id + "/" + this.guestParticipate;
        return;
      }

      if (!res.publicAccess) {
        //error for not having public access
        this.testStringGuest = "The poll is not public, please log in first";
        return;
      }
      this.testStringGuest = "Success";
      this.router.navigateByUrl("/user/"+0+"/poll/"+res.id);
    });
  }

}
