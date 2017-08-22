/**
 * Created by matthewRanftle1 on 8/18/17.
 */

import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import {WordPairService} from "../services/wordpair.service";

@Component({
  selector:'questions',
  templateUrl: '../templates/questions.component.html',
  styleUrls: ['../stylesheets/instructions.component.css'],
  providers: [WordPairService]
})

export class QuestionsComponent implements OnInit {
  questionNum: number;
  @ViewChild('response') response:any;
  @Input() testPhase: number;
  @Output() testPhaseChange = new EventEmitter<number>();
  @Output() instructionsChange = new EventEmitter<boolean>();

  constructor( private wordPairService: WordPairService) {}

  nextQuestion() {
    if(this.questionNum==1) {

      //next question
      this.questionNum++;
    }
    else if(this.questionNum > 1 && this.questionNum < 5) {

      //save user response
      var ur = this.response.nativeElement.value || null;
      var userresponse = {
        question_number: this.questionNum-1,
        response: ur
      };
      this.wordPairService.saveQuestionResponse(userresponse);

      //if last question go to logout, else go to next question
      if (this.questionNum==4) {
        // this.questionNum=1;
        this.testPhase++;
        this.testPhaseChange.emit(this.testPhase);
      }
      else {
        this.questionNum++;
      }
    }
  }
  ngOnInit() {
    this.questionNum =1;
  }
}
