/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Component, OnInit, ViewChild } from '@angular/core'
import { UserService } from '../services/user.service'

@Component({
  selector:'login',
  templateUrl: '../templates/login.component.html',
  styleUrls:['../stylesheets/login.component.css'],
  providers: [UserService]
})

export class UserComponent {

  @ViewChild('username') username: any;
  @ViewChild('password') password: any;
  private loading: boolean;

  constructor(private userService: UserService) {
  }

  // getJwtToken() : void {
  //   console.log(this.userService.getJwtToken(
  //     this.username.nativeElement.value,
  //     this.password.nativeElement.value)
  // )};

  login() {
    let errMsg: string;
    this.loading = true;
    this.userService.login(this.username.nativeElement.value, this.password.nativeElement.value)
      .subscribe(
        data => {
          console.log('Success');
          //this.router.navigate(['/']);
        },
        error => {
          console.log('Error');
          this.loading = false;
        }
      );
  }
}
