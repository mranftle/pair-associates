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

@Component({
  selector:'instructions',
  templateUrl: '../templates/intro.component.html',
  providers: [AuthService]
})

export class IntroComponent {

  constructor(private router:Router,
              private userService: AuthService,
              private alertService: AlertService) {}

  startStudy(): void {

      // this.router.navigate(['/study-phase']);
    console.log(localStorage);
  }


}
