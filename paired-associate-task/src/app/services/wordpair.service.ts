/**
 * Created by matthewRanftle1 on 3/1/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WordPairService {
  private wordPairUrl = 'http://localhost:8000/wordpairs';


  constructor(private http: Http) { }

  getWordPairs() {
    return this.http.get(this.wordPairUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
