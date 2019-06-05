import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopicsService } from '../topics.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  topic;

  constructor(private route: ActivatedRoute,
    private topicService: TopicsService) { }

  ngOnInit(){
   // this.topic = this.topicService.getTopic(1);

    this.route.paramMap.subscribe(params => {
      this.topicService.getTopic(params.get('topicID')).subscribe(topic => {this.topic=topic;});
    }); 

  }

}
