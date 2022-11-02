import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollViewComponent } from './poll-view/poll-view.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'poll-list', component: PollListComponent },
  { path: 'poll-view', component: PollViewComponent },
  { path: 'poll-vote', component: PollVoteComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
