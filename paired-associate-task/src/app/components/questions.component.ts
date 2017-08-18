/**
 * Created by matthewRanftle1 on 8/18/17.
 */

import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";

@Component({
  selector:'questions',
  templateUrl: '../templates/questions.component.html',
  styleUrls: ['../stylesheets/instructions.component.css']
})

export class QuestionsComponent implements OnInit {
  questionNum: number;
  @ViewChild('response') response:any;
  @Input() testPhase: number;
  @Output() testPhaseChange = new EventEmitter<number>();
  @Output() instructionsChange = new EventEmitter<boolean>();

  nextQuestion() {
    if(this.questionNum < 4) {
      //TODO submit response here
      console.log(this.response.nativeElement.value);

      this.questionNum++;
    }
    else {
      this.questionNum=1;
      // this.testPhase++;
      // this.testPhaseChange.emit(this.testPhase);
    }
  }
  ngOnInit() {
    this.questionNum =1;
  }
}
