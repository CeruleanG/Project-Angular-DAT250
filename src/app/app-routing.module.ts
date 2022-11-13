import { NgModule } from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollViewComponent } from './poll-view/poll-view.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';

const routes: Routes = [

  { path:'',redirectTo:'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
    { path: 'user/:id', component: PollListComponent},
      { path: 'user/:id/poll/:idPoll', component: PollVoteComponent},
  { path: 'register', component: RegisterComponent},

  { path: 'poll-list', component: PollListComponent },
  { path: 'poll-view', component: PollViewComponent },
  { path: 'poll-vote', component: PollVoteComponent },


];

//A test when a URL request is received. It can allow or deny the access.
class MyGuard implements CanActivate {
  canActivate() {
    return true;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
