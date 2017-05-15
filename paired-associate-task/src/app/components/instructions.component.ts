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
  providers: [AuthService]
})

export class IntroComponent implements OnInit {
  isTest=0;
  userId: number;

  constructor(private router: Router,
              private wordPairService: WordPairService,
              private alertService: AlertService) {
  }

  startStudy(): void {
    this.router.navigate(['/study-phase'])

  }

  startTest1(): void {
    this.router.navigate(['/test-phase'], {queryParams: {test_phase: this.isTest}});
  }

  startTest2(): void {

    this.router.navigate(['/test-phase']);
  }

  endExperiment(): void {
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
          this.wordPairService.setTestOrTrain(this.userId, 0);
        }
        else {
          this.wordPairService.setTestOrTrain(this.userId, this.isTest + 1);
        }
      }
  );
}




}
