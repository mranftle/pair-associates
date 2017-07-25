/**
 * Created by matthewRanftle1 on 3/3/17.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  @Input() wordPairs: WordPair[];
  @Input() testPhase: number;
  @Input() instructions: boolean;
  @Output() instructionsChange = new EventEmitter<boolean>();
  @Output() testPhaseChange = new EventEmitter<number>();

  i: number;

  cycleWords(): void {
    setTimeout(() => {
      this.i++;
      if (this.i < this.wordPairs.length) {
        this.cycleWords();
      }
      else {
        this.testPhase++;
        this.instructions = true;
        this.testPhaseChange.emit(this.testPhase);
        this.instructionsChange.emit(this.instructions);

      }
    }, 1000); // responseTime between words presented in study phase
  }

  ngOnInit(): void {
    this.i = 0;
    this.cycleWords();
  }

}
