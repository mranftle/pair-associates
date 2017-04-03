"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by matthewRanftle1 on 3/15/17.
 */
/**
 * Created by matthewRanftle1 on 3/3/17.
 */
var core_1 = require('@angular/core');
var wordpair_service_1 = require('./wordpair.service');
var TestComponent = (function () {
    function TestComponent(wordPairService) {
        this.wordPairService = wordPairService;
    }
    TestComponent.prototype.getWordPairs = function () {
        var _this = this;
        this.wordPairService.getWordPairs().then(function (wordPairs) {
            _this.wordPairs = wordPairs;
        });
    };
    TestComponent.prototype.ngOnInit = function () {
        this.getWordPairs();
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'test',
            template: "<div> *ngFor=\"let word of WordPairs\">{{word.word1}</div>",
            providers: [wordpair_service_1.WordPairService]
        })
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
