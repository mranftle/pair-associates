/**
 * Created by matthewRanftle1 on 4/11/17.
 */
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Component, OnInit, ViewChild } from '@angular/core'
import { AuthService } from '../services/auth.service'
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {WordPairService} from "../services/wordpair.service";

@Component({
  selector:'instructions',
  templateUrl: '../templates/instructions.component.html',
  providers: [AuthService]
})

export class IntroComponent implements OnInit {
  isTest=false;

  constructor(private router: Router,
              private wordPairService: WordPairService,
              private alertService: AlertService) {
  }

  startStudy(): void {
    this.router.navigate(['/study-phase'])

  }

  ngOnInit(): void {
    this.wordPairService.getTestOrTrain().then(
      (isTest) => {
        this.isTest = isTest;
      }
  );
}




}
