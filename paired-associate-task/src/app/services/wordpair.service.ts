/**
 * Created by matthewRanftle1 on 3/1/17.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class WordPairService {
  private wordPairUrl = 'http://localhost:8000/wordpairs';
  private isTestUrl = 'http://localhost:8000/istest';
  constructor(private http: Http) { }

  getWordPairs() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'JWT '+ currentUser.token});
    let options = new RequestOptions({ headers:headers });
    return this.http.get(this.wordPairUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // return whether a user is testing or training
  getTestOrTrain() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'JWT '+ currentUser.token});
    console.log(headers);
    let options = new RequestOptions({ headers:headers });
    return this.http.get(this.isTestUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  // set whether a user is testing or training
  setTestOrTrain(user_id:number, is_test: boolean) {
    let body = JSON.stringify({is_test:is_test});
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'JWT '+ currentUser.token});
    let options = new RequestOptions({ headers:headers });
    let url = this.isTestUrl + '/' + user_id + '/set_is_test/';
    console.log(url,body);
    this.http.post(url,body,options) // ...using post request
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => 'Server error') //...errors if
      .subscribe();;
  }


  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
