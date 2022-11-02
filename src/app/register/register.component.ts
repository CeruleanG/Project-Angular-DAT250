import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../model/user";
import {CrudService} from "./service/crud.service";
import {Poll} from "../model/poll";

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

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {

    this.userObj = new UserProfile();
    this.userArr = [];
    //this.getUserList();
  }

  getUserList() {
    this.crudService.getUserList().subscribe(res => {
      this.userArr = res;
    });
  }

  getUser(){
    this.crudService.getUserList().subscribe(res => {
      this.userArr = res;
    });

  }

  addUser() {
    this.userObj.login = this.addUserLogin;
    if(this.addUserPwd1 != this.addUserPwd2){
      //error
    }
    else {
      this.userObj.pwd = this.addUserPwd1;
      this.crudService.addUser(this.userObj).subscribe(res => {
        this.ngOnInit();
      })
    }

  }

  deletePoll(user: UserProfile) {
    this.crudService.deleteUser(user).subscribe(res => {
      this.ngOnInit();
    })
  }

}
