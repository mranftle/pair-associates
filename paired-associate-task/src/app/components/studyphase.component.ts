/**
 * Created by matthewRanftle1 on 3/3/17.
 */
import {Component, OnInit, Input} from '@angular/core';
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
  @Input() wordPairs: WordPair[];
  i: number;
  constructor( private wordPairService: WordPairService,
               private router: Router) {}

  cycleWords(): void {
    setTimeout(() => {
      this.i++;
      if (this.i < this.wordPairs.length) {
        this.cycleWords();
      }
      else {
        this.i = 0;
        // this.cycleWords();
        // set testing = true
        // this.wordPairService.setTestOrTrain(true);
        this.router.navigate(['/instructions']);

      }
    }, 1000); // responseTime between words presented in study phase
  }

  ngOnInit(): void {
    this.i = 0;
    this.cycleWords();
  }

}
