"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Matthew Ranftle on 3/3/17.
 *
 * Testphase Component for the Memory Task
 *
 */
var core_1 = require('@angular/core');
var wordpair_service_1 = require('./../wordpair.service.ts');
var TestPhaseComponent = (function () {
    function TestPhaseComponent(wordPairService) {
        this.wordPairService = wordPairService;
    }
    TestPhaseComponent.prototype.getWordPairs = function () {
        var _this = this;
        this.wordPairService.getWordPairs().then(function (wordPairs) {
            _this.wordPairs = wordPairs;
            _this.showCorrect = false;
            _this.selectedWordPair = _this.wordPairs[0];
            _this.responseNum = 0;
            // this.timer = setTimeout(() => this.submitPair(), 5000); // TESTING TIME
            _this.responseTime = Date.now();
        });
    };
    TestPhaseComponent.prototype.submitPair = function () {
        var _this = this;
        var elipsedTime = Date.now() - this.responseTime;
        this.userResponses.push({
            wordPair: this.selectedWordPair,
            response: this.response.nativeElement.value,
            responseTime: elipsedTime,
        });
        console.log(this.userResponses[this.userResponses.length - 1]);
        this.showCorrect = true;
        setTimeout(function () {
            if (_this.responseNum < _this.wordPairs.length - 1) {
                _this.responseNum++;
            }
            else {
                //testing done, route to next component
                //store responses
                _this.responseNum = 0;
            }
            _this.selectedWordPair = _this.wordPairs[_this.responseNum];
            _this.showCorrect = false;
            _this.resetTimer();
        }, 1000); // FEEDBACK TIME
    };
    TestPhaseComponent.prototype.resetTimer = function () {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () { return _this.submitPair(); }, 5000); // TESTING TIME
        this.responseTime = Date.now();
    };
    TestPhaseComponent.prototype.ngOnInit = function () {
        this.getWordPairs();
        this.selectedWordPair = {
            word1: null,
            word2: null
        };
        this.userResponses = [];
    };
    __decorate([
        core_1.ViewChild('response')
    ], TestPhaseComponent.prototype, "response", void 0);
    TestPhaseComponent = __decorate([
        core_1.Component({
            selector: 'test-phase',
            templateUrl: './testphase.component.html',
            providers: [wordpair_service_1.WordPairService]
        })
    ], TestPhaseComponent);
    return TestPhaseComponent;
}());
exports.TestPhaseComponent = TestPhaseComponent;
