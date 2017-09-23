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
  @Input() cue_time: number;
  @Input() study_time: number;
  @Output() instructionsChange = new EventEmitter<boolean>();
  @Output() testPhaseChange = new EventEmitter<number>();
  cue: boolean;

  i: number;

  cycleWords(): void {
    setTimeout(() => {
      this.i++;
      if (this.i < this.wordPairs.length) {

        //show cue, after 500ms show cycle words
        this.cue= true;
        setTimeout(() => {
          this.cue = false;
          this.cycleWords();
        }, this.cue_time);
      }
      else {

        //study done route to next component
        // this.cycleWords();
        this.testPhase++;
        this.instructions = true;
        this.testPhaseChange.emit(this.testPhase);
        this.instructionsChange.emit(this.instructions);

      }
    }, this.study_time); // responseTime between words presented in study phase
  }

  ngOnInit(): void {
    this.cue = true;
    this.i = 0;
    setTimeout(()=>{
      this.cue = false;
    }, this.cue_time);
    this.cycleWords();
  }

}
