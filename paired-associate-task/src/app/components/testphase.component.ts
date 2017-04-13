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
import {Router} from "@angular/router";

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
  responseNumber:number;
  timer: Timer;
  responseNum: number;

  constructor( private wordPairService: WordPairService,
               private router: Router) {}

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
    var userresponse = {
      word1: this.selectedWordPair.word1,
      word2: this.selectedWordPair.word2,
      response_number:this.responseNum,
      response: this.response.nativeElement.value,
      response_time: elipsedTime,

    };
    console.log(typeof(userresponse));
    this.wordPairService.saveUserResponse(userresponse);
    this.showCorrect = true;
    setTimeout(() => {
      if (this.responseNum < this.wordPairs.length - 1) {
        this.responseNum++;
      } else {

        //testing done, route to next component
        //store responses
        // this.router.navigate(['/instructions'])
        this.responseNum = 0;
      }
      this.selectedWordPair = this.wordPairs[this.responseNum];
      this.showCorrect = false;
      this.resetTimer()

    }, 1000); // FEEDBACK TIME

  }

  resetTimer() : void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.submitPair(), 5000); // TESTING TIME
    this.responseTime = Date.now();
  }

  ngOnInit(): void {
    this.getWordPairs();
    this.selectedWordPair = {
      word1: null,
      word2: null
    };

  }
}
