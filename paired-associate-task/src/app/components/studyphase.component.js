"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by matthewRanftle1 on 3/3/17.
 */
var core_1 = require('@angular/core');
var wordpair_service_1 = require('../services/wordpair.service');
var StudyPhaseComponent = (function () {
    function StudyPhaseComponent(wordPairService, router) {
        this.wordPairService = wordPairService;
        this.router = router;
    }
    StudyPhaseComponent.prototype.cycleWords = function () {
        var _this = this;
        setTimeout(function () {
            _this.i++;
            if (_this.i < _this.wordPairs.length) {
                _this.cycleWords();
            }
            else {
                _this.i = 0;
                // this.cycleWords();
                // set testing = true
                // this.wordPairService.setTestOrTrain(true);
                _this.router.navigate(['/instructions']);
            }
        }, 1000); // responseTime between words presented in study phase
    };
    StudyPhaseComponent.prototype.ngOnInit = function () {
        this.i = 0;
        this.cycleWords();
    };
    __decorate([
        core_1.Input()
    ], StudyPhaseComponent.prototype, "wordPairs", void 0);
    StudyPhaseComponent = __decorate([
        core_1.Component({
            selector: 'study-phase',
            templateUrl: '../templates/studyphase.component.html',
            styleUrls: ['../stylesheets/studyphase.component.css'],
            providers: [wordpair_service_1.WordPairService]
        })
    ], StudyPhaseComponent);
    return StudyPhaseComponent;
}());
exports.StudyPhaseComponent = StudyPhaseComponent;
