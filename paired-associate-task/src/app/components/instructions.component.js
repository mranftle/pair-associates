"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
var core_1 = require('@angular/core');
var auth_service_1 = require('../services/auth.service');
var IntroComponent = (function () {
    function IntroComponent(router, wordPairService, alertService) {
        this.router = router;
        this.wordPairService = wordPairService;
        this.alertService = alertService;
        this.isTest = 0;
        this.cue = false;
    }
    IntroComponent.prototype.startStudy = function () {
        this.cue = true;
        setTimeout(function () {
            this.cue = false;
        }, 1000);
        this.router.navigate(['/study-phase']);
    };
    IntroComponent.prototype.startTest1 = function () {
        this.cue = true;
        setTimeout(function () {
            this.cue = false;
        }, 1000);
        this.router.navigate(['/test-phase'], { queryParams: { test_phase: this.isTest } });
    };
    IntroComponent.prototype.endExperiment = function () {
        this.cue = true;
        setTimeout(function () {
            this.cue = false;
        }, 1000);
        this.router.navigate(['/login']);
    };
    // get test status and user_id
    IntroComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.wordPairService.getTestOrTrain().then(function (userInfo) {
            _this.userId = userInfo['id'];
            _this.isTest = userInfo['test_phase'];
            // cycle test phases
            if (_this.isTest >= 5) {
                _this.wordPairService.setTestOrTrain(_this.userId, 1);
            }
            else {
                _this.wordPairService.setTestOrTrain(_this.userId, _this.isTest + 1);
            }
        });
    };
    IntroComponent = __decorate([
        core_1.Component({
            selector: 'instructions',
            templateUrl: '../templates/instructions.component.html',
            styleUrls: ['../stylesheets/studyphase.component.css'],
            providers: [auth_service_1.AuthService]
        })
    ], IntroComponent);
    return IntroComponent;
}());
exports.IntroComponent = IntroComponent;
