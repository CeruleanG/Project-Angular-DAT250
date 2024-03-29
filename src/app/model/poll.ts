import {UserProfile} from "../model/user";

export class Poll {
  public id : number = 0;
  public topic : string = '';
  public yesNb : number = 0;
  public noNb : number = 0;
  public status : boolean;
  public owner : UserProfile;
  public participants : UserProfile[]; // list of user profile
  public publicAccess : boolean ;

}

/*
export class Poll {
  public votepoll_id : number = 0;
  public owner_id : number = 0;
  public subject : string = '';
  public ispublic : number = 0;
  public status : number = 0;
}
 */
