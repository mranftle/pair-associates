/**
 * Created by matthewRanftle1 on 4/11/17.
 */
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core'
import {Router} from "@angular/router";

@Component({
  selector:'instructions',
  templateUrl: '../templates/instructions.component.html',
  styleUrls: ['../stylesheets/instructions.component.css']
})

export class InstructionsComponent {
  @Input() testPhase: number;
  @Input() instructions: boolean;
  @Output() instructionsChange = new EventEmitter<boolean>();
  @Output() testPhaseChange = new EventEmitter<number>();

  constructor(private router:Router){}

  logout() : void {
    if(this.testPhase < 8) {
      this.testPhase++;
    }
    else {
      this.testPhase=1;
    }
    this.testPhaseChange.emit(this.testPhase);

    this.router.navigate(['/login']);
  }

  toggleInstructions(): void {
    this.instructions = false;
    this.instructionsChange.emit(this.instructions);
  }

  nextInstruction(): void {
    this.testPhase++;
    this.testPhaseChange.emit(this.testPhase);
  }
}
