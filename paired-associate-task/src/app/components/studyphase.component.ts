/**
 * Created by matthewRanftle1 on 3/3/17.
 */
import { Component, OnInit} from '@angular/core';
import { WordPair } from '../entities/wordpair';
import { WordPairService } from '../services/wordpair.service';
import {Router} from "@angular/router";

@Component({
  selector: 'study-phase',
  templateUrl: '../templates/studyphase.component.html',
  styleUrls: ['../stylesheets/studyphase.component.css'],
  providers: [WordPairService]
})

export class StudyPhaseComponent {
  // instructions = "Instructions here";
  wordPairs: WordPair[];
  selectedWordPair: WordPair;
  i: number;
  constructor( private wordPairService: WordPairService,
               private router: Router) {}

  getWordPairs(): void {
    this.wordPairService.getWordPairs().then(
      (wordPairs) => {
        this.wordPairs = wordPairs;
        this.selectedWordPair = this.wordPairs[0];
        this.i = 0;
        this.cycleWords();
      }
    );
  }

  cycleWords(): void {
    setTimeout(() => {
      this.selectedWordPair = this.wordPairs[this.i];
      this.i++;
      if (this.i < this.wordPairs.length) {
        this.cycleWords();
      }
      else {
        this.i = 0;
        // this.cycleWords();
        // set testing = true
        this.wordPairService.setTestOrTrain(true);
        this.router.navigate(['/intro']);

      }
    }, 1000); // responseTime between words presented in study phase
  }

  ngOnInit(): void {
    this.getWordPairs();
    this.selectedWordPair = {
      word1: null,
      word2: null
    };

  }

}
