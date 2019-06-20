import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators'
import { Observable } from 'rxjs';

export class Vote {
  "voteID"; //: "1",
  "loginEmail"; //: "voter@icsd.k12.ny.us",
  "topicID"; //: "4",
  "voteValue"; //: "Yes",
  "voteDateTime"; //: "2019-06-01T12:30:00-05:00"
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
    return this.http.get('/assets/votes.json').pipe(map((votes: any) => {
      this.votes = votes;
    }));
  }

  addVote(avote: Vote) {
    VotesService.nextVoteId = VotesService.nextVoteId + 1;
    avote.voteID = VotesService.nextVoteId;
    this.votes.push(avote);
  }

  hasVoted(auserid, atopicid) {
    
    if (this.votes != null) {
      this.votes.forEach(v => {
        if (v.topicID === atopicid && v.loginEmail === auserid) {
          return true;
        }    
      });
    }

    return false;
  }
}
