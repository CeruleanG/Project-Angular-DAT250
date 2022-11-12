import { Component, OnInit } from '@angular/core';
import {Poll} from "../model/poll";
import {CrudService} from "./service/crud.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {HttpClient} from "@angular/common/http";

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserProfile} from "../model/user";


@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent { //implements OnInit

  title = 'PollList';
  show = true;

  AccessToken: boolean = false;
  user: UserProfile;

  pollObj: Poll = new Poll();
  pollQuery: Poll = new Poll();
  pollArr: Poll[] = [];
  queryID: number;

  addPollSubject: string = '';
  addPollIspublic: boolean;

  participateID: number;

  testString: string | null;

  constructor(private crudService: CrudService, private route: ActivatedRoute, private routeNext: Router) { }


  ngOnInit(): void {
    this.addPollSubject = '';

    this.pollObj = new Poll();
    this.pollQuery = new Poll();

    /*this.route.queryParams.subscribe(params => {
        //this.queryUser(params.get('id'));
        this.testString = params[':id'];
        //this.testString = "this.user.login";
    });*/

    this.queryUser(Number(this.route.snapshot.paramMap.get("id")));
    this.getPollList();
  }

  getPollList() {
    this.crudService.getPollList().subscribe(res => {
      this.pollArr = res.filter((poll)=>{return poll.owner.id === this.user.id});
    });
  }

  addPoll() {
    this.pollObj.topic = this.addPollSubject; //changed
    this.pollObj.publicAccess = this.addPollIspublic;
    this.pollObj.owner = this.user;
    this.crudService.addPoll(this.pollObj).subscribe(res => {
      this.ngOnInit();
    });

  }

  deletePoll(poll: Poll) {
    this.crudService.deletePoll(poll).subscribe(res => {
      this.ngOnInit();
    })
  }

  openPoll(poll : Poll) {
      poll.status = true;
      this.crudService.updatePoll(poll).subscribe(res => {
        this.ngOnInit();
      })
  }

  closePoll(poll : Poll) {
    poll.status = false;
    //this.pollObj.topic = "it works";
    this.crudService.updatePoll(poll).subscribe(res => {
          this.ngOnInit();
    })
  }


  updatePoll(poll : Poll) {

    //this.pollObj.subject = "it works";
    this.crudService.updatePoll(this.pollObj).subscribe(res => {
      this.ngOnInit();
    })
  }

  queryPoll(iD : number){
    this.crudService.queryPoll(iD).subscribe(res => {
      this.pollQuery = new Poll();
      this.pollQuery = res;
      return res;
    });
  }
  queryUser(iD : number)
  {
    this.crudService.queryUser(iD).subscribe(res => {
      this.user = res;
      return res;
    });
  }

  toVotePoll()
  {
    const iD: number = this.participateID;
    this.crudService.queryPoll(iD).subscribe(res => {
      if (res.id == -1) {
        //error for not found poll
        this.testString = "poll not found: id=" + res.id + "/" + this.participateID;
        return;
      }

      if (res.owner.id == this.user.id) {
        //error for voting your own poll
        this.testString = "this is your own poll";
        return;
      }
      //if (res.participants.includes(this.user)) {
      if(res.participants.some((item) => item.id == this.user.id)){
        //error for voting a poll you already voted for
        this.testString = "you have already voted";
        return;
      }
      this.testString = "success "+iD+"/"+res.id;
      this.routeNext.navigateByUrl("/user/"+this.user.id+"/poll/"+res.id);
    });
  }

  logOut(){
    this.routeNext.navigateByUrl("/login");
  }
}
