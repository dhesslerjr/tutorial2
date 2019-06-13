import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  topics: any[] = null;
  static nextTopicId = 100;

  constructor(private http: HttpClient) {


  }

  init() {
    return this.http.get('/assets/topics.json').pipe(map((topics: any) => {
      this.topics = topics;
    }));
  }

  addTopic(topic: any) {
    TopicsService.nextTopicId = TopicsService.nextTopicId + 1;
    topic.topicID = TopicsService.nextTopicId;
    this.topics.push(topic);
  }

  getTopic(atopicID) {
    if (this.topics == null) {
      return this.init().pipe(flatMap(() => {
        return Observable.create(o => o.next(this.topics.find(topic => {
          return topic.topicID == atopicID
        })));
      }));
    }
    else {
      return Observable.create(o => o.next(this.topics.find(topic => {
        return topic.topicID == atopicID
      })));
    }

  }

  putTopic(atopic) {
    let i = this.topics.map(topic => topic.topicID).indexOf(atopic.topicID);
    if (i > -1) {
      this.topics[i] = atopic;
    }
  }


  getTopics() {
    if (this.topics == null) {
      return this.init().pipe(map(() => { return this.topics }));
    }
    else {
      return Observable.create(o => o.next(this.topics));
    }
  }
}
