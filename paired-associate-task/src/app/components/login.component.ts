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
          // this.alertService.success('login success')
          this.router.navigate(['/memory-task']);
        },
        error => {
          this.alertService.error(error)
          this.loading = false;
        }
      );
  }
}
