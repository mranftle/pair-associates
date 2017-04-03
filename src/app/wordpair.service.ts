/**
 * Created by matthewRanftle1 on 3/1/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WordPair } from './wordpair';
import { WORDPAIRS } from './wordpair-list';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WordPairService {
  private wordPairUrl = 'http://localhost:8000/wordpairs';

  constructor(private http:Http){}

  getWordPairs(): Promise<WordPair[]> {
    return this.http.get(this.wordPairUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};

  }

  private handleError (error:Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
