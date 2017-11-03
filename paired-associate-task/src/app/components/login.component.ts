/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Component, OnInit, ViewChild } from '@angular/core'
import { AuthService } from '../services/auth.service'
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";

@Component({
  selector:'login',
  templateUrl: '../templates/login.component.html',
  styleUrls:['../stylesheets/login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit{

  @ViewChild('username') username: any;
  @ViewChild('password') password: any;
  private loading: boolean;
  private userId: number;
  private testPhase: number;
  private isMorning: boolean;
  private lastLogin: Date;

  constructor(private router:Router,
              private userService: AuthService,
              private alertService: AlertService) {}

  ngOnInit() {
    //reset login status
    this.userService.logout();
  }

  login() {
    let errMsg: string;
    this.loading = true;
    this.userService.login(this.username.nativeElement.value, this.password.nativeElement.value)
      .subscribe(
        data => {
          // get user_id, test_phase, is_morning, last_login_time.
          // pass to memory task
          this.userService.getUserInfo().then(
            (userInfo) => {
              this.userId = userInfo['id'];
              this.testPhase = userInfo['test_phase'];
              this.isMorning = userInfo['is_morning'];
              this.lastLogin = userInfo['last_login'];
              
              console.log(this.userId, this.testPhase, this.isMorning, this.lastLogin)
              this.router.navigate(['/memory-task', {userId: this.userId,
                                                     testPhase: this.testPhase}]);
              // check is morning and last login time compared to current login time.
            }
          );
          // this.router.navigate(['/memory-task']);
        },
        error => {
          this.alertService.error(error)
          this.loading = false;
        }
      );
  }
}
