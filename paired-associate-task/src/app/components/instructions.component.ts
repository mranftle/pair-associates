/**
 * Created by matthewRanftle1 on 4/11/17.
 */
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
  selector:'instructions',
  templateUrl: '../templates/instructions.component.html',
  styleUrls: ['../stylesheets/instructions.component.css']
})

export class InstructionsComponent {
  @Input() testPhase: number;
  @Input() instructions: boolean;
  @Output() instructionsChange = new EventEmitter<boolean>();

  hideInstructions(): void {
    this.instructions = false;
    this.instructionsChange.emit(this.instructions);
  }
}
