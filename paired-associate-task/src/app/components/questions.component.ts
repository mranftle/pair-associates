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
  sleepRating = 'None';
  @ViewChild('response') response: any;
  @Input() testPhase: number;
  @Input() isMorning: boolean;
  @Output() testPhaseChange = new EventEmitter<number>();
  @Output() instructionsChange = new EventEmitter<boolean>();

  constructor(private wordPairService: WordPairService) {
  }

  nextQuestion() {
    var user_response = {
      question_number: 0,
      response: ''
    }

    if (this.questionNum == 1) {

      //next question
      this.questionNum++;
    }

    else if (this.questionNum == 2 || this.questionNum == 8 || this.questionNum == 10) {
      user_response.question_number = 1;
      user_response.response = this.sleepRating;
      this.questionNum++;
      this.wordPairService.saveQuestionResponse(user_response);
    }

    else {
      var ur = this.response.nativeElement.value || null;
      user_response.question_number = this.questionNum - 1;
      user_response.response = ur;

      this.wordPairService.saveQuestionResponse(user_response);

      //if last question go to logout, else go to next question
      if (this.questionNum == 11 || (this.questionNum == 5 && this.isMorning)) {
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
      this.questionNum = 1;
  }
}
