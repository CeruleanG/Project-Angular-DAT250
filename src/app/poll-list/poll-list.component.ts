import { Component, OnInit } from '@angular/core';
import {Poll} from "../model/poll";
import {CrudService} from "./service/crud.service";

import {HttpClient} from "@angular/common/http";

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent { //implements OnInit

  title = 'PollList';
  show = true;

  pollObj: Poll = new Poll();
  pollQuery: Poll = new Poll();
  pollArr: Poll[] = [];
  queryID: number;

  addPollSubject: string = '';
  addPollIspublic: boolean;
  updatePollIsopen: number;
  updatePollIsclosed: boolean;

  testcheckpoing: boolean;

  //polllist: PollList [];

  constructor(private crudService: CrudService) { }


  ngOnInit(): void {
    this.addPollSubject = '';
    this.addPollIspublic ;
    this.updatePollIsopen;
    this.pollObj = new Poll();
    this.pollArr = [];
    this.pollQuery = new Poll();
    this.getPollList();
    this.queryPoll(this.queryID);

    this.testcheckpoing;
  }

  getPollList() {
    this.crudService.getPollList().subscribe(res => {
      this.pollArr = res;
    });
  }

  addPoll() {
    this.pollObj.topic = this.addPollSubject; //changed
    this.pollObj.public = this.addPollIspublic;
    /*if(this.addPollIspublic == true){
      this.pollObj.public = true; //true
    }
    else {
      this.pollObj.public = false; //false
    }*/


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

  openPoll(poll : Poll) {
      poll.status = 1;
      this.crudService.updatePoll(poll).subscribe(res => {
        this.ngOnInit();
      })
  }

  closePoll(poll : Poll) {
    poll.status = 0;
    //this.pollObj.topic = "it works";
    this.crudService.updatePoll(poll).subscribe(res => {
          this.ngOnInit();
    })
  }


  updatePoll(poll : Poll) {

    this.pollObj.status = this.updatePollIsopen;
    //this.pollObj.subject = "it works";
    this.crudService.updatePoll(this.pollObj).subscribe(res => {
      this.ngOnInit();
    })
  }

  queryPoll(iD : number){
    this.crudService.queryPoll(iD).subscribe(res => {
      this.pollQuery = res;
    });
  }

  /*queryPoll(poll : Poll){
    this.crudService.queryPoll(poll).subscribe(res => {
      this.pollObj = res;
    });
  }*/


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
