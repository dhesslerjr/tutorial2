import { Component, OnInit } from '@angular/core';
import { TopicsService} from '../topics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {
  topics;

  constructor(private topicsService: TopicsService,private router: Router) { 
    this.topicsService.getTopics().subscribe(topics => {this.topics=topics;});
  }

  ngOnInit() {
  }

  getTopicsOfStatusUrl()
  {
    var filtTopics: any [] = [];
    if(this.router.url==="/topics/open")
    {
      this.topics.forEach(u => {
        console.log(u.Title)
        if (u.topicStatus === "Open") {
          filtTopics.push(u);
        }
      });
      return filtTopics;
    }
    else{
      return this.topics;
    }
    

  }
}
