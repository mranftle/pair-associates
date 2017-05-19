/**
 * Created by matthewRanftle1 on 4/11/17.
 */
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Component, OnInit, ViewChild } from '@angular/core'
import { AuthService } from '../services/auth.service'
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {WordPairService} from "../services/wordpair.service";

@Component({
  selector:'instructions',
  templateUrl: '../templates/instructions.component.html',
  styleUrls: ['../stylesheets/studyphase.component.css'],
  providers: [AuthService]
})

export class IntroComponent implements OnInit {
  isTest=0;
  cue=false;
  userId: number;

  constructor(private router: Router,
              private wordPairService: WordPairService,
              private alertService: AlertService) {
  }

  startStudy(): void {
    this.cue = true;
    setTimeout(function(){
      this.cue = false;

    }, 1000);
    this.router.navigate(['/study-phase'])

  }

  startTest1(): void {
    this.cue = true;
    setTimeout(function(){
      this.cue = false;
    }, 1000);
    this.router.navigate(['/test-phase'], {queryParams: {test_phase: this.isTest}});
  }

  endExperiment(): void {
    this.cue = true;
    setTimeout(function(){
      this.cue = false;
    }, 1000);
      this.router.navigate(['/login']);
  }

  // get test status and user_id
  ngOnInit(): void {
    this.wordPairService.getTestOrTrain().then(
      (userInfo) => {
        this.userId = userInfo['id'];
        this.isTest = userInfo['test_phase'];

        // cycle test phases
        if(this.isTest >= 5){
          this.wordPairService.setTestOrTrain(this.userId, 1);
        }
        else {
          this.wordPairService.setTestOrTrain(this.userId, this.isTest + 1);
        }
      }
  );
}




}
