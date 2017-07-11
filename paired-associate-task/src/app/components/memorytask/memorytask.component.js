"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var auth_service_1 = require("../../services/auth.service");
var wordpair_service_1 = require("../../services/wordpair.service");
var studyphase_component_1 = require("../studyphase.component");
var testphasenofeedback_component_1 = require("../testphasenofeedback.component");
/**
 * Created by matthewRanftle1 on 7/6/17.
 */
var MemoryTaskComponent = (function () {
    function MemoryTaskComponent(userService, wordPairService) {
        this.userService = userService;
        this.wordPairService = wordPairService;
    }
    MemoryTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loaded = false;
        this.jwt = this.userService.getJwt();
        this.wordPairService.getWordPairs().then(function (wordPairs) {
            _this.wordPairs = wordPairs;
            _this.wordPairService.getTestOrTrain().then(function (userInfo) {
                _this.userId = userInfo['id'];
                _this.isTest = userInfo['test_phase'];
                _this.loaded = true;
            });
        });
    };
    __decorate([
        core_1.ViewChild(studyphase_component_1.StudyPhaseComponent)
    ], MemoryTaskComponent.prototype, "studyPhaseComponent", void 0);
    __decorate([
        core_1.ViewChild(testphasenofeedback_component_1.TestPhaseNoFeedbackComponent)
    ], MemoryTaskComponent.prototype, "testPhaseComponent", void 0);
    MemoryTaskComponent = __decorate([
        core_1.Component({
            selector: 'memory-task',
            templateUrl: '../../templates/memorytask.component.html',
            providers: [auth_service_1.AuthService,
                wordpair_service_1.WordPairService]
        })
    ], MemoryTaskComponent);
    return MemoryTaskComponent;
}());
exports.MemoryTaskComponent = MemoryTaskComponent;
