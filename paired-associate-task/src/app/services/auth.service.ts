/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private userUrl = 'https://pairsassociatesapi.servehttp.com/api-token-auth/';
  private userInfoUrl = 'https://pairsassociatesapi.servehttp.com/userinfo/';
  // private userUrl = 'http://localhost:8000/api-token-auth/';
  // private userInfoUrl = 'http://localhost:8000/userinfo/';
  private postResponse='';
  constructor(private http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }


  login(username: string, password: string) {
    let body = JSON.stringify({username: username, password: password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.userUrl,body,options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);
          localStorage.setItem('currentUser', 'JWT '.concat(user.token));
        }
      });




  }

  // return user id, is testing or training, is morning, and last login time
  getUserInfo() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
      'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers:headers });
    return this.http.get(this.userInfoUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  // set the value of last login and is_morning boolean
  setIsMorningAndTime(user_id:number, is_morning:boolean, last_login:Date) {
    let body = JSON.stringify({is_morning:is_morning, last_login:last_login});
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
      'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers:headers });
    let url = this.userInfoUrl + user_id + '/set_is_morning';
    this.http.post(url,body, options)
      .map(res => res.json())
      .catch((error:any) => 'Server error')
      .subscribe();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getJwt() {
    return localStorage.getItem('currentUser');
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
