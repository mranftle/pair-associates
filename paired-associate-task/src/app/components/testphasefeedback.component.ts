/**
 * Created by matthewRanftle1 on 7/11/17.
 */
import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { WordPair } from '../entities/wordpair';
import { WordPairService } from '../services/wordpair.service';
import Timer = NodeJS.Timer;

@Component({
  selector: 'test-phase-feed-back',
  templateUrl: '../templates/testphasefeedback.component.html',
  styleUrls:['../stylesheets/testphase.component.css'],
  providers: [WordPairService]
})

export class TestPhaseFeedbackComponent implements OnInit {
  @ViewChild('response') response: any;
  @Input() wordPairs: WordPair[];
  @Input() instructions: boolean;
  @Input() testPhase: number;
  @Input() cue_time: number;
  @Input() test_time_feedback: number;
  @Input() feedback_time: number;
  @Output() instructionsChange = new EventEmitter<boolean>();
  @Output() testPhaseChange = new EventEmitter<number>();
  cue:boolean;
  i: number;
  showCorrect: boolean;
  responseTime: number;
  timer: Timer;

  constructor( private wordPairService: WordPairService) {}

  submitPair(): void {
    var elipsedTime = Date.now() - this.responseTime;
    var ur = this.response.nativeElement.value || null;
    // this.response.nativeElement.value = null;
    var userresponse = {
      word1: this.wordPairs[this.i].word1,
      word2: this.wordPairs[this.i].word2,
      response_number:this.i,
      response:  ur,
      response_time: elipsedTime,
      test_phase: this.testPhase

    };

    this.wordPairService.saveUserResponse(userresponse);
    this.showCorrect = true;

    // FEEDBACK
    setTimeout(() => {
      if (this.i < this.wordPairs.length - 1) {
        this.i++;
      } else {

        //testing done, route to next component
        clearTimeout(this.timer);
        this.testPhase++;
        this.instructions = true;
        this.testPhaseChange.emit(this.testPhase);
        this.instructionsChange.emit(this.instructions);
        return;
      }
      this.showCorrect = false;
      this.resetTimer();

    }, this.feedback_time); // FEEDBACK TIME
  }

  resetTimer() : void {
    this.cue = true;
    setTimeout(()=>{
      this.cue = false;
    }, this.cue_time);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.submitPair(), this.test_time_feedback); // TESTING TIME
    this.responseTime = Date.now();
  }

  ngOnInit(): void {
    this.cue = true;
    this.i = 0;
    this.responseTime = Date.now();

    //cue
    setTimeout(()=>{
      this.cue = false;
    }, this.cue_time);
    this.timer = setTimeout(() => this.submitPair(), this.test_time_feedback); // TESTING TIME
  }
}
