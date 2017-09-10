/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core'
import {Router} from "@angular/router";
import {Instruction} from "../entities/instruction"

@Component({
  selector:'instructions',
  templateUrl: '../templates/instructions.component.html',
  styleUrls: ['../stylesheets/instructions.component.css']
})

export class InstructionsComponent {
  @Input() testPhase: number;
  @Input() instructions: boolean;
  @Input() instruction_list:Instruction[];
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
    // this.testPhaseChange.emit(this.testPhase);

    // this.router.navigate(['/goodbye']);
  }

  getInstruction(){
    return this.instruction_list
               .find(x => x.instruction_num === this.testPhase)
               .instruction_text;
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
