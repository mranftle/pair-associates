/**
 * Created by matthewRanftle1 on 3/1/17.
 */
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class WordPairService {
  // private wordPairUrl = 'https://pairsassociatesapi.servehttp.com/wordpairs/';
  // private isTestUrl = 'https://pairsassociatesapi.servehttp.com/istest/';
  // private userResponseUrl='https://pairsassociatesapi.servehttp.com/userresponse/';
  private wordPairUrl = 'http://localhost:8000/wordpairs/';
  private isTestUrl = 'http://localhost:8000/istest/';
  private userResponseUrl='http://localhost:8000/userresponse/';
  constructor(private http: Http) { }

  // get word pairs for study and testing
  getWordPairs() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser});
    let options = new RequestOptions({ headers:headers });
    return this.http.get(this.wordPairUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // return whether a user is testing or training
  getTestOrTrain() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers:headers });
    return this.http.get(this.isTestUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  // set whether a user is testing or training
  setTestOrTrain(user_id:number, is_test: number) {
    let body = JSON.stringify({test_phase:is_test});
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser});
    let options = new RequestOptions({ headers:headers });
    let url = this.isTestUrl + user_id + '/set_is_test/';
    this.http.post(url,body,options) // ...using post request
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => 'Server error') //...errors if
      .subscribe();
  }

  // save user response
  saveUserResponse(userresponse:any) {
    let body = JSON.stringify(userresponse);
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({'Authorization': currentUser,
                               'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers:headers });

    this.http.post(this.userResponseUrl, body, options) // ...using post request
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => 'Server error') //...errors if
      .subscribe();
  }

  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
