/**
 * Created by Matthew Ranftle on 3/3/17.
 *
 * Testphase Component for the Memory Task
 *
 */
import {Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import { WordPair } from '../entities/wordpair';
import { WordPairService } from '../services/wordpair.service';
import Timer = NodeJS.Timer;

@Component({
  selector: 'test-phase-no-feed-back',
  templateUrl: '../templates/testphasenofeedback.component.html',
  styleUrls:['../stylesheets/testphase.component.css'],
  providers: [WordPairService]
})

export class TestPhaseNoFeedbackComponent implements OnInit {
  @ViewChild('response') response: any;
  @Input() wordPairs: WordPair[];
  @Input() testPhase: number;
  @Input() instructions: boolean;
  @Input() cue_time: number;
  @Input() test_time_no_feedback: number;
  @Output() testPhaseChange = new EventEmitter<number>();
  @Output() instructionsChange = new EventEmitter<boolean>();
  cue:boolean;
  i: number;
  selectedWordPair: WordPair;
  responseTime: number;
  timer: Timer;

  constructor( private wordPairService: WordPairService) {}

  submitPair(): void {
    var elipsedTime = Date.now() - this.responseTime;
    var ur = this.response.nativeElement.value || null;
    this.response.nativeElement.value = null;
    var userresponse = {
      word1: this.wordPairs[this.i].word1,
      word2: this.wordPairs[this.i].word2,
      response_number:this.i,
      response:  ur,
      response_time: elipsedTime,
      test_phase: this.testPhase

    };

    this.wordPairService.saveUserResponse(userresponse);
      if (this.i < this.wordPairs.length -1 ) {
          this.i++;
      } else {

        //testing done, exit component
        this.testPhase++;
        this.instructions = true;
        this.testPhaseChange.emit(this.testPhase);
        this.instructionsChange.emit(this.instructions);
        return;
      }
      this.selectedWordPair = this.wordPairs[this.i];
      this.resetTimer();
  }

  resetTimer() : void {
    this.cue = true;
    setTimeout(()=>{
      this.cue = false;
    }, this.cue_time);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.submitPair(), this.test_time_no_feedback); // TESTING TIME
    this.responseTime = Date.now();
  }

  ngOnInit(): void {
    this.cue=true;
    this.i = 0;
    this.responseTime = Date.now();

    //cue 500ms
    setTimeout(()=>{
      this.cue = false;
    }, this.cue_time);
    this.timer = setTimeout(() => this.submitPair(), this.test_time_no_feedback); // TESTING TIME
  }
}
