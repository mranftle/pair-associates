/**
 * Created by Matthew Ranftle on 3/3/17.
 *
 * Testphase Component for the Memory Task
 *
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import { WordPair } from '../entities/wordpair';
import { WordPairService } from '../services/wordpair.service';
import Timer = NodeJS.Timer;
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'test-phase',
  templateUrl: '../templates/testphase.component.html',
  styleUrls:['../stylesheets/testphase.component.css'],
  providers: [WordPairService]
})

export class TestPhaseComponent implements OnInit {
  // instructions = "Instructions here";
  @ViewChild('response') response: any;
  wordPairs: WordPair[];
  selectedWordPair: WordPair;
  showCorrect: boolean;
  responseTime: number;
  timer: Timer;
  responseNum: number;
  testPhase: number;
  sub: any;

  constructor( private wordPairService: WordPairService,
               private router: Router,
               private route: ActivatedRoute) {}

  getWordPairs(): void {
    this.wordPairService.getWordPairs().then(
      (wordPairs) => {
        this.wordPairs = wordPairs;
        this.showCorrect=false;
        this.selectedWordPair = this.wordPairs[0];
        this.responseNum = 0;
        this.timer = setTimeout(() => this.submitPair(), 5000); // TESTING TIME
        this.responseTime = Date.now();
      }
    );
  }

  submitPair(): void {
    var elipsedTime = Date.now() - this.responseTime;
    var ur = this.response.nativeElement.value || null;
    this.response.nativeElement.value = null;
    var userresponse = {
      word1: this.selectedWordPair.word1,
      word2: this.selectedWordPair.word2,
      response_number:this.responseNum,
      response:  ur,
      response_time: elipsedTime,
      test_phase: this.testPhase

    };
    this.wordPairService.saveUserResponse(userresponse);
    this.showCorrect = true;
    setTimeout(() => {
      if (this.responseNum < this.wordPairs.length - 1) {
        this.responseNum++;
      } else {

        //testing done, route to next component
        clearTimeout(this.timer);
        this.router.navigate(['/instructions']);
        return;
      }
      this.selectedWordPair = this.wordPairs[this.responseNum];
      this.showCorrect = false;
      this.resetTimer();

    }, 1000); // FEEDBACK TIME

  }

  resetTimer() : void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.submitPair(), 5000); // TESTING TIME
    this.responseTime = Date.now();
  }


  ngOnInit(): void {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.testPhase = +params['test_phase'] || 0;
      });
    this.getWordPairs();
    this.selectedWordPair = {
      word1: null,
      word2: null
    };

  }
}
