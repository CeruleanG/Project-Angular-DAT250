import { Component, OnInit } from '@angular/core';
import {Poll} from "../model/poll";
import {CrudService} from "./service/crud.service";

import {HttpClient} from "@angular/common/http";

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs";
/*
export class PollList {
  constructor(
    public votepoll_id : number,
    public owner_id : number,
    public subject : string,
    public ispublic : number,
    public status : number
  ) {
  }
}
*/


@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent { //implements OnInit

  title = 'PollList';
  show = true;

  pollObj: Poll = new Poll();
  pollArr: Poll[] = [];

  addPollSubject: string = '';
  addPollIspublic: boolean;
  updatePollIsopen: number;
  updatePollIsclosed: boolean;

  //closeResult: string;

  //polllist: PollList [];

  constructor(private crudService: CrudService) { }


  ngOnInit(): void {
    this.addPollSubject = '';
    this.addPollIspublic ;
    this.updatePollIsopen;
    this.pollObj = new Poll();
    this.pollArr = [];
    this.getPollList();
  }

  getPollList() {
    this.crudService.getPollList().subscribe(res => {
      this.pollArr = res;
    });
  }

  addPoll() {
    this.pollObj.subject = this.addPollSubject; //changed

    if(this.addPollIspublic != true){
      this.pollObj.ispublic = 1; //true
    }
    else {
      this.pollObj.ispublic = 0; //false
    }
    //this.pollObj.owner_id = 2;  //put owned id here, do same for the other elements
    this.crudService.addPoll(this.pollObj).subscribe(res => {
      this.ngOnInit();
    })
  }

  deletePoll(poll: Poll) {
    this.crudService.deletePoll(poll).subscribe(res => {
      this.ngOnInit();
    })
  }
/*
  openPoll(poll : Poll) {
      this.pollObj.status = 1;
      this.crudService.updatePoll(poll).subscribe(res => {
        this.ngOnInit();
      })
   }

    closePoll(poll : Poll) {
        this.pollObj.status = 0;
        this.pollObj.subject = "it works";
        this.crudService.updatePoll(poll).subscribe(res => {
          this.ngOnInit();
        })
      }
      */

  updatePoll(poll : Poll) {

    this.pollObj.status = this.updatePollIsopen;
    //this.pollObj.subject = "it works";
    this.crudService.updatePoll(this.pollObj).subscribe(res => {
      this.ngOnInit();
    })
  }



}
/*
  getPollList()
    {
      this.httpClient.get<any>(this.serviceURL).subscribe(
        response => {
          this.pollArr = response;
        }
      );
    }

  addPoll(){

    this.pollObj.subject = this.addPollSubject; //changed
    this.pollObj.ispublic = this.addPollIspublic;


    this.httpClient.post(this.serviceURL,this.pollObj).subscribe(response => {
        this.ngOnInit(); //reload the table
      });

*/

/*
getPollList(){
  this.httpClient.get<any>('http://localhost:3000/poll').subscribe(
    response => {
      console.log(response);
      this.polllist = response;
    }
  ); //will have to change url when we get the working API
}
*/

/* //from to do list assignment
  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }
*/
