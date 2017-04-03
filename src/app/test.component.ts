/**
 * Created by matthewRanftle1 on 3/15/17.
 */
/**
 * Created by matthewRanftle1 on 3/3/17.
 */
import { Component, OnInit} from '@angular/core';
import { WordPair } from './wordpair';
import { WordPairService } from './wordpair.service';

@Component({
  selector: 'test',
  template: `<div> *ngFor="let word of wordPairs">{{word.word1}}</div>`,
  providers: [WordPairService]
})

export class TestComponent {
  // instructions = "Instructions here";
  wordPairs: WordPair[];
  errorMessage: string;
  constructor( private wordPairService: WordPairService) {}

  // getWordPairs(): void {
  //   this.wordPairService.getWordPairs().subscribe(
  //     wordPairs => this.wordPairs = wordPairs,
  //     error => this.errorMessage = <any>error );
  // }

  // ngOnInit(): void {
  //   this.getWordPairs();
  // }

}
