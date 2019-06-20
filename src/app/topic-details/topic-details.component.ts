import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic,TopicsService } from '../topics.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  topic: Topic;

  //public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  //public pieChartData = [120, 150, 180, 90];
  public pieChartLabels = ['Yes','No','Abstain'];
  //public pieChartColors = [{backgroundColor: '#00cc00'}, {backgroundColor: '#ff0000'}, {backgroundColor: '#ffff33'}];
  public pieChartColors = [{backgroundColor: ['#00cc00','#ff0000','#ffff33']}];
  public pieChartData = [];

  public pieChartType = 'pie';

  constructor(private route: ActivatedRoute,
    private topicService: TopicsService,
    private loginService: LoginService) { }

  ngOnInit(){
   
    this.route.paramMap.subscribe(params => {
      this.topicService.getTopic(params.get('topicID')).subscribe(topic => {
//          this.topic = JSON.parse(JSON.stringify(topic));
          this.topic = topic;
          this.refreshChart();
        });
    });
  }

  refreshChart()
  {
    this.pieChartData = []; // Clear any existing data in case "topicID" changes
        // Populate data set in the same order as the labels
        this.pieChartData.push(this.topic.countYes);
        this.pieChartData.push(this.topic.countNo);
        this.pieChartData.push(this.topic.countAbstain);

  }

  vote(myvote){

    var x = Number("1");
    var y = Number(this.topic.countYes);
    var n = Number(this.topic.countNo);
    var a = Number(this.topic.countAbstain);

    switch(myvote){
      case "yes":
          this.topic.countYes = y + x;
          break;
      case "no":
            this.topic.countNo = n + x;
            break;
      case "abstain":
            this.topic.countAbstain = a + x;
            break;
    }
    this.refreshChart();
  }

  voteBtnVisible(){
    if(this.loginService.isLoggedIn()){
      return this.loginService.getCurrentUser().isVoterRole && this.topic.topicStatus === 'Open';
    } else {
      return false;
    }
  }

  editable(){
    if(this.loginService.isLoggedIn()){
      return this.loginService.getCurrentUser().isAuthorRole && (this.topic.topicStatus === 'Draft') || ((this.topic.topicStatus === 'Published'));
    } else {
      return false;
    }
  }
}
