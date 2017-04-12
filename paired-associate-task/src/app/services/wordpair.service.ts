/**
 * Created by matthewRanftle1 on 3/1/17.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WordPairService {
  private wordPairUrl = 'http://localhost:8000/wordpairs';
  private instructionsUrl = 'http://localhost:8000/instructions'

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
    return this.http.get(this.instructionsUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  // set whether a user is testing or training
  setTestOrTrain(is_test: boolean) {
    let body = JSON.stringify({is_test:is_test})
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'JWT '+ currentUser.token});
    let options = new RequestOptions({ headers:headers});
    console.log(body);
    return this.http.post(this.wordPairUrl, body, options)
  }


  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
