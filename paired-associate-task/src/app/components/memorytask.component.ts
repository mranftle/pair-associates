import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {WordPair} from "../entities/wordpair";
import {User} from "../entities/user";
import {AlertService} from "../services/alert.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {WordPairService} from "../services/wordpair.service";
import {StudyPhaseComponent} from "./studyphase.component";
import {TestPhaseNoFeedbackComponent} from "./testphasenofeedback.component";
import {InstructionsComponent} from "./instructions.component";
/**
 * Created by matthewRanftle1 on 7/6/17.
 */

@Component({
  selector: 'memory-task',
  templateUrl: '../templates/memorytask.component.html',
  styleUrls: ['../stylesheets/memorytask.component.css'],
  providers: [AuthService,
    WordPairService]

})

export class MemoryTaskComponent implements OnInit {
  @ViewChild(StudyPhaseComponent) studyPhaseComponent: StudyPhaseComponent;
  @ViewChild(TestPhaseNoFeedbackComponent) testPhaseComponent: TestPhaseNoFeedbackComponent;
  @ViewChild(InstructionsComponent) instructionsComponent: InstructionsComponent;
  wordPairs: WordPair[];
  jwt: string;
  loaded: boolean;
  instructions: boolean;
  userId: number;
  testPhase: number;

  constructor(private userService: AuthService,
              private wordPairService: WordPairService) {
  }

  updateTestPhase() {
    this.shuffleWordPairs();
    this.wordPairService.setTestOrTrain(this.userId, this.testPhase);
    // if()
  }

  ngOnInit() {
      this.loaded = true;
      // this.jwt = this.userService.getJwt();
      console.log(localStorage.getItem('currentUser'));
      this.wordPairService.getWordPairs().then(
        (wordPairs) => {
          // this.wordPairs = wordPairs.slice(0,5);
          this.shuffleWordPairs();
          this.wordPairService.getTestOrTrain().then(
            (userInfo) => {
              console.log(userInfo);
              this.userId = userInfo['id'];
              this.testPhase = userInfo['test_phase'];
              this.instructions = true;
              this.loaded = true;
            }
          );
        }
      );
  }

  //F isher-Yates shuffle
  shuffleWordPairs() {
    var i = 0
      , j = 0
      , temp = null

    for (i = this.wordPairs.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.wordPairs[i];
      this.wordPairs[i] = this.wordPairs[j];
      this.wordPairs[j] = temp;
    }
  }
}
