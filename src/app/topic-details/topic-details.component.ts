import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic,TopicsService } from '../topics.service';
import { LoginService } from '../login.service';
import { VotesService, Vote } from '../votes.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  topic: Topic;

  public pieChartLabels = ['Yes','No','Abstain'];
  public pieChartColors = [{backgroundColor: ['#00cc00','#ff0000','#ffff33']}];
  public pieChartData = [];

  public pieChartType = 'pie';

  voteBtnVisible = false;

  constructor(private route: ActivatedRoute,
    private topicService: TopicsService,
    private loginService: LoginService, private votesService: VotesService) { }

  ngOnInit(){

    this.route.paramMap.subscribe(params => {
      this.topicService.getTopic(params.get('topicID')).subscribe(topic => {
//          this.topic = JSON.parse(JSON.stringify(topic));
          this.topic = topic;
          this.refreshChart();
          this.setVoteBtnVisibility();
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

    var v: Vote = new Vote();
    v.loginEmail = this.loginService.getCurrentUser().loginEmail;
    v.topicID = this.topic.topicID;

    this.votesService.addVote(v).subscribe(() => {
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
      this.setVoteBtnVisibility();
    });
  }

  setVoteBtnVisibility() {
    if(this.loginService.isLoggedIn()){
    this.votesService.hasVoted(this.loginService.getCurrentUser().loginEmail, this.topic.topicID)
      .subscribe(voted => {
        this.voteBtnVisible = !voted
          && this.loginService.getCurrentUser().isVoterRole &&
            this.topic.topicStatus === 'Open';
      });
    } else {
      this.voteBtnVisible = false;
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
