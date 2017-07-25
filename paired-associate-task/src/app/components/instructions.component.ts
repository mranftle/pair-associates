/**
 * Created by matthewRanftle1 on 4/11/17.
 */
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core'
import { AuthService } from '../services/auth.service'
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {WordPairService} from "../services/wordpair.service";

@Component({
  selector:'instructions',
  templateUrl: '../templates/instructions.component.html',
  styleUrls: ['../stylesheets/instructions.component.css'],
  providers: [AuthService]
})

export class InstructionsComponent {
  @Input() testPhase: number;
  @Input() instructions: boolean;
  @Output() instructionsChange = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  hideInstructions(): void {
    this.instructions = false;
    this.instructionsChange.emit(this.instructions);
  }
  // startStudy(): void {
  //   this.cue = true;
  //   setTimeout(function(){
  //     this.cue = false;
  //
  //   }, 1000);
  //   this.router.navigate(['/study-phase'])
  //
  // }
  //
  // startTest1(): void {
  //   this.cue = true;
  //   setTimeout(function(){
  //     this.cue = false;
  //   }, 1000);
  //   this.router.navigate(['/test-phase'], {queryParams: {test_phase: this.testPhase}});
  // }
  //
  // endExperiment(): void {
  //   this.cue = true;
  //   setTimeout(function(){
  //     this.cue = false;
  //   }, 1000);
  //     this.router.navigate(['/login']);
  // }
}
