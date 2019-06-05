import { Component, OnInit } from '@angular/core';
import { TopicsService} from '../topics.service';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {
  topics;

  constructor(private topicsService: TopicsService) { 
    this.topicsService.getTopics().subscribe(topics => {this.topics=topics;});
  }

  ngOnInit() {
  }

}
