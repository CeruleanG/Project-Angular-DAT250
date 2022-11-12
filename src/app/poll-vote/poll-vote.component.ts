import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfile} from "../model/user";
import {Poll} from "../model/poll";
import {CrudService} from "../poll-list/service/crud.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements OnInit {

  title = 'PollVote';
  show = true;

  userFrom:UserProfile;
  pollFrom:Poll;

  testStringA:string;
  testStringB:string;

  constructor(private crudService: CrudService,private routeFrom :ActivatedRoute, private routeNext: Router) { }

  ngOnInit(): void {
    this.queryUser(Number(this.routeFrom.snapshot.paramMap.get("id")));
    this.queryPoll(Number(this.routeFrom.snapshot.paramMap.get("idPoll")));

  }



  queryUser(iD : number){
    this.crudService.queryUser(iD).subscribe(res => {
      this.userFrom=res;
    });
  }

  queryPoll(iD : number){
    this.crudService.queryPoll(iD).subscribe(res => {
      this.pollFrom=res;
    });
  }

  goingBack(){
    this.crudService.getUserList().subscribe(res => {
      if(Number(this.routeFrom.snapshot.paramMap.get("id")) == 0 ){
        this.routeNext.navigateByUrl("/login");
      }
    });
    this.routeNext.navigateByUrl("/user/"+Number(this.routeFrom.snapshot.paramMap.get("id")));
  }

  yesVote(){
    this.pollFrom.yesNb ++;
    this.crudService.getUserList().subscribe(res => {
      if(Number(this.routeFrom.snapshot.paramMap.get("id")) == 0 ){
        this.routeNext.navigateByUrl("/login");
      }
    });
    this.crudService.updatePoll(this.pollFrom).subscribe(response => {});
    this.crudService.userParticipatesPoll(this.userFrom,this.pollFrom).subscribe(response => {});
    this.goingBack();
  }

  noVote(){
    this.pollFrom.noNb ++;
    this.crudService.getUserList().subscribe(res => {
      if(Number(this.routeFrom.snapshot.paramMap.get("id")) == 0 ){
        this.routeNext.navigateByUrl("/login");
      }
    });
    this.crudService.updatePoll(this.pollFrom).subscribe(response => {});
    this.testStringB = String(this.pollFrom.noNb);
    this.crudService.userParticipatesPoll(this.userFrom,this.pollFrom).subscribe(response => {});
    this.goingBack();
  }
}
