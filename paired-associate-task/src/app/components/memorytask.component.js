"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by matthewRanftle1 on 6/20/17.
 */
var core_1 = require('@angular/core');
var wordpair_service_1 = require("../services/wordpair.service");
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var studyphase_component_1 = require("./studyphase.component");
var MemoryTaskComponent = (function () {
    function MemoryTaskComponent(wordPairService, router) {
        this.wordPairService = wordPairService;
        this.router = router;
    }
    MemoryTaskComponent.prototype.getWordPairs = function (userJwt) {
        var _this = this;
        this.wordPairService.getWordPairs(userJwt).then(function (wordPairs) {
            _this.wordPairs = wordPairs;
        });
    };
    MemoryTaskComponent.prototype.getExperimentPhase = function (userJwt) {
        var _this = this;
        this.wordPairService.getTestOrTrain(userJwt).then(function (userInfo) {
            _this.userId = userInfo['id'];
            _this.testPhase = userInfo['test_phase'];
        });
    };
    MemoryTaskComponent.prototype.incrementTestPhase = function () {
        // cycle test phases
        if (this.testPhase >= 5) {
            this.wordPairService.setTestOrTrain(this.userId, 1);
        }
        else {
            this.wordPairService.setTestOrTrain(this.userId, this.testPhase + 1);
        }
    };
    MemoryTaskComponent.prototype.startStudy = function () {
        this.router.navigate(['study-phase']);
    };
    MemoryTaskComponent.prototype.updateTestPhase = function () {
        var _this = this;
        this.wordPairService.getTestOrTrain(this.userJwt).then(function (userInfo) {
            _this.userId = userInfo['id'];
            _this.testPhase = userInfo['test_phase'];
        });
    };
    ;
    MemoryTaskComponent.prototype.ngAfterViewInit = function () {
        // this.studyPhase.cycleWords();
        // this.incrementTestPhase();
    };
    MemoryTaskComponent.prototype.ngOnInit = function () {
        this.userJwt = ng2_cookies_1.Cookie.get('uid');
        this.getWordPairs(this.userJwt);
        // this.getExperimentPhase(this.userJwt);
    };
    __decorate([
        core_1.ViewChild(studyphase_component_1.StudyPhaseComponent)
    ], MemoryTaskComponent.prototype, "studyPhase", void 0);
    MemoryTaskComponent = __decorate([
        core_1.Component({
            selector: 'memory-task',
            templateUrl: '../templates/memorytask.component.html',
            // styleUrls: [],
            providers: [wordpair_service_1.WordPairService]
        })
    ], MemoryTaskComponent);
    return MemoryTaskComponent;
}());
exports.MemoryTaskComponent = MemoryTaskComponent;
