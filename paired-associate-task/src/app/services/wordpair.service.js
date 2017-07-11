"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by matthewRanftle1 on 3/1/17.
 */
var core_1 = require('@angular/core');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var WordPairService = (function () {
    function WordPairService(http) {
        this.http = http;
        this.wordPairUrl = 'http://127.0.0.1:8000/wordpairs';
        this.isTestUrl = 'http://127.0.0.1:8000/istest';
        this.userResponseUrl = 'http://127.0.0.1:8000/userresponse/';
    }
    // get word pairs for study and testing
    WordPairService.prototype.getWordPairs = function () {
        var currentUser = JSON.parse(ng2_cookies_1.Cookie.get('currentUser'));
        var headers = new http_1.Headers({ 'Authorization': 'JWT ' + currentUser.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.wordPairUrl, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // return whether a user is testing or training
    WordPairService.prototype.getTestOrTrain = function () {
        var currentUser = JSON.parse(ng2_cookies_1.Cookie.get('currentUser'));
        var headers = new http_1.Headers({ 'Authorization': 'JWT ' + currentUser.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.isTestUrl, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // set whether a user is testing or training
    WordPairService.prototype.setTestOrTrain = function (user_id, is_test) {
        var body = JSON.stringify({ test_phase: is_test });
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new http_1.Headers({ 'Authorization': 'JWT ' + currentUser.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.isTestUrl + '/' + user_id + '/set_is_test/';
        this.http.post(url, body, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return 'Server error'; }) //...errors if
            .subscribe();
    };
    // save user response
    WordPairService.prototype.saveUserResponse = function (userresponse) {
        var body = JSON.stringify(userresponse);
        var currentUser = JSON.parse(ng2_cookies_1.Cookie.get('currentUser'));
        var headers = new http_1.Headers({ 'Authorization': 'JWT ' + currentUser.token,
            'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.userResponseUrl, body, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return 'Server error'; }) //...errors if
            .subscribe();
    };
    //more detailed error message to come, move to error file
    WordPairService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    WordPairService = __decorate([
        core_1.Injectable()
    ], WordPairService);
    return WordPairService;
}());
exports.WordPairService = WordPairService;
