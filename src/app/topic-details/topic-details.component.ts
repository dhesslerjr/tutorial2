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

  //public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  //public pieChartData = [120, 150, 180, 90];
  public pieChartLabels = ['Yes',"No",'Abstain'];
  public pieChartData = [];
  
  public pieChartType = 'pie';

  constructor(private route: ActivatedRoute,
    private topicService: TopicsService) { }

  ngOnInit(){
   // this.topic = this.topicService.getTopic(1);

    this.route.paramMap.subscribe(params => {
      this.topicService.getTopic(params.get('topicID')).subscribe(topic => {
        this.topic=topic;
        let vyes = topic['countYes'].map(topic => topic.main.vyes);
        let vno = topic['countYes'].map(topic => topic.main.vyes);
        let vabstain = topic['countYes'].map(topic => topic.main.vyes);
        this.topic.pieChartData.push(vyes);
        this.topic.pieChartData.push(vno);
        this.topic.pieChartData.push(vabstain);
      });
    }); 

  }

}
