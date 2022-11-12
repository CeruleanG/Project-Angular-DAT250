import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../model/user";
import {CrudService} from "./service/crud.service";
import {Poll} from "../model/poll";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  show = true;

  userObj: UserProfile = new UserProfile();
  userArr: UserProfile[] = [];

  addUserLogin: string = '';
  addUserPwd1: string = '';
  addUserPwd2: string = '';

  matchResult: string;
  idFound: number;

  constructor(private crudService: CrudService,private routeNext: Router) { }

  ngOnInit(): void {

    this.userObj = new UserProfile();
    this.userArr = [];
    //this.getUserList();
  }



  getUser(){
    this.crudService.getUserList().subscribe(res => {
      this.userArr = res;
    });

  }

  addUser() {
    this.crudService.getUserList().subscribe(res => {
      this.userArr = res;
      if(this.userArr.some((user) => user.login === this.addUserLogin)){
        this.matchResult = "Username already taken";
        return;
      }
    });

    this.userObj.login = this.addUserLogin;

    if(this.addUserPwd1 != this.addUserPwd2){
      this.matchResult = "Passwords aren't matching";
      return;
    }
    this.userObj.pwd = this.addUserPwd1;
    this.crudService.addUser(this.userObj).subscribe(res => {});
    this.matchResult = this.addUserLogin;
    this.routeNext.navigateByUrl("/login");

    return;
  }

  deletePoll(user: UserProfile) {
    this.crudService.deleteUser(user).subscribe(res => {
      this.ngOnInit();
    })
  }
  getUserList() {
    this.crudService.getUserList().subscribe(res => {
      this.userArr = res;
    });
  }

}
