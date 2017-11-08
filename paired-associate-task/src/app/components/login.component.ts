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
              let userId = userInfo['id'];
              let testPhase = userInfo['test_phase'];
              let isMorning = userInfo['is_morning'];
              let lastLogin = userInfo['last_login'];
              let check_time = this.checkCurrentTime(isMorning, lastLogin)
              if(check_time.length>0) {
                this.alertService.error(check_time);
                return;
              }
              console.log(userId, testPhase, isMorning, lastLogin)
              this.router.navigate(['/memory-task', {userId: userId,
                                                     testPhase: testPhase,
                                                     isMorning: isMorning}]);
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

  checkCurrentTime(isMorning: boolean, lastLogin: any) {
    console.log('checkCurrentTime');
    let currentTime = new Date();
    let error_message = '';

    //incorrect login time, deny access
    // if (currentTime.getHours() > 10 && currentTime.getHours() < 18){
    //   return false;
    // }

    //first login
    if (isMorning == null) {
      // set morning
      if (currentTime.getHours() >= 6 && currentTime.getHours() <=10) {
        isMorning = true;
      }

      // set night
      else if ((currentTime.getHours() >=18 && currentTime.getHours() <=24)|| currentTime.getHours() <=2){
        isMorning = false;
      }

    }
    else {

      //morning user
      if(isMorning == true) {
        if ((currentTime.getHours() <6 || currentTime.getHours() > 10) || (currentTime.getHours() - lastLogin.getHours() < 8)) {
          error_message = "You are assigned to complete this task in the morning. Please login when you wake up.";
          return error_message;
        }

      }
      // evening user
      else {
        if ((currentTime.getHours() < 18 && (currentTime.getHours() != 2 || currentTime.getHours() != 1)) || (currentTime.getHours() - lastLogin.getHours() < 8)) {
          error_message = "You are assigned to complete this task in the evening. Please login before you go to bed.";

          return error_message;
        }

      }
    }

    return error_message;

  }
}
