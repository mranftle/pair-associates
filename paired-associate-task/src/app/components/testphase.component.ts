/**
 * Created by Matthew Ranftle on 3/3/17.
 *
 * Testphase Component for the Memory Task
 *
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import { WordPair } from '../entities/wordpair';
import { WordPairService } from '../services/wordpair.service';
import {UserResponse} from "../entities/userresponse";
import Timer = NodeJS.Timer;

@Component({
  selector: 'test-phase',
  templateUrl: '../templates/testphase.component.html',
  providers: [WordPairService]
})

export class TestPhaseComponent {
  // instructions = "Instructions here";
  @ViewChild('response') response: any;
  wordPairs: WordPair[];
  selectedWordPair: WordPair;
  userResponses:UserResponse[];
  showCorrect: boolean;
  responseTime: number;
  timer: Timer;
  i: number;

  constructor( private wordPairService: WordPairService) {}

  getWordPairs(): void {
    this.wordPairService.getWordPairs().then(
      (wordPairs) => {
        this.wordPairs = wordPairs;
        this.showCorrect=false;
        this.selectedWordPair = this.wordPairs[0];
        this.i = 0;
        // this.timer = setTimeout(() => this.submitPair(), 5000); // TESTING TIME
        this.responseTime = Date.now();
      }
    );
  }

  submitPair(): void {
    var elipsedTime = Date.now() - this.responseTime;
    this.userResponses.push({
      wordPair: this.selectedWordPair,
      response: this.response.nativeElement.value,
      responseTime: elipsedTime,

    });
    console.log(this.userResponses[this.userResponses.length-1]);
    this.showCorrect = true;
    setTimeout(() => {
      if (this.i < this.wordPairs.length - 1) {
        this.i++;
      } else {

        //testing done, route to next component
        //store responses

        this.i = 0;
      }
      this.selectedWordPair = this.wordPairs[this.i];
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
    this.userResponses=[];

  }

}
