import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {WordPair} from "../entities/wordpair";
import {User} from "../entities/user";
import {AlertService} from "../services/alert.service";
import {AuthService} from "../services/auth.service";
import {Router, ActivatedRoute} from "@angular/router";
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
  cue_time: number;
  study_time: number;
  test_time_feedback: number;
  feedback_time: number;
  test_time_no_feedback:number;
  testPhase: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: AuthService,
              private wordPairService: WordPairService) {
  }

  updateTestPhase() {
    this.shuffleWordPairs();
    this.wordPairService.setTestOrTrain(this.userId, this.testPhase);
  }

  ngOnInit() {
      this.loaded = false;
      this.userId = this.route.snapshot.params['userId'];
      this.testPhase = this.route.snapshot.params['testPhase'];
      this.wordPairService.getWordPairs().then(
        (wordPairs) => {
          this.wordPairs = wordPairs;
          this.shuffleWordPairs();
          // check is morning and last login time compared to current login time.
          this.instructions = true;
          this.wordPairService.getTiming().then(
            (timing) => {
                this.cue_time = timing[0]['cue_time'];
                this.study_time = timing[0]['study_time'];
                this.test_time_feedback = timing[0]['test_time_feedback'];
                this.feedback_time = timing[0]['feedback_time'];
                this.test_time_no_feedback = timing[0]['test_time_no_feedback'];
                this.loaded = true;
            }
          );
        }
      );
  }

  //Fisher-Yates shuffle
  shuffleWordPairs() {
    var i = 0
      , j = 0
      , temp = null;

    for (i = this.wordPairs.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.wordPairs[i];
      this.wordPairs[i] = this.wordPairs[j];
      this.wordPairs[j] = temp;
    }
  }
}
