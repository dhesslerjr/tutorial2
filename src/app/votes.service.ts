import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators'
import { Observable } from 'rxjs';

export class Vote {
  voteID; //: "1",
  loginEmail; //: "voter@icsd.k12.ny.us",
  topicID; //: "4",
  voteValue; //: "Yes",
  voteDateTime; //: "2019-06-01T12:30:00-05:00"
}

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  votes: Vote[] = null;
  static nextVoteId = 100;

  constructor(private http: HttpClient) {
  }

  init() {
    if ( null === this.votes ) {
      return this.http.get('/assets/votes.json').pipe(map((votes: any) => {
        this.votes = votes;
      }));
    } else {
      return Observable.create(o => o.next());
    }
  }

  addVote(avote: Vote) {
    return this.init().pipe(map(() => {
      VotesService.nextVoteId = VotesService.nextVoteId + 1;
      avote.voteID = VotesService.nextVoteId;
      this.votes.push(avote);
    }));
  }

  hasVoted(auserid, atopicid) {
    return this.init().pipe(map(() => {
      return this.votes.findIndex(v => v.topicID === atopicid && v.loginEmail === auserid) > -1;
    }));
  }
}
