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
var wordpair_service_1 = require('../services/wordpair.service');
var TestPhaseNoFeedbackComponent = (function () {
    function TestPhaseNoFeedbackComponent(wordPairService, router, route) {
        this.wordPairService = wordPairService;
        this.router = router;
        this.route = route;
    }
    // getWordPairs(): void {
    //   this.wordPairService.getWordPairs().then(
    //     (wordPairs) => {
    //       this.wordPairs = wordPairs;
    //       this.showCorrect=false;
    //       this.selectedWordPair = this.wordPairs[0];
    //       // this.responseNum = 0;
    //
    //       //set timer for
    //       console.log(this.testPhase);
    //       if(this.testPhase == 2 || this.testPhase == 3) {
    //         this.timer = setTimeout(() => this.submitPair(), 5000); // TESTING TIME
    //       }
    //       else if (this.testPhase == 4) {
    //         this.timer = setTimeout(() => this.submitPairNoFeedback(), 5000); //TESTING TIME
    //       }
    //       this.responseTime = Date.now();
    //     }
    //   );
    // }
    TestPhaseNoFeedbackComponent.prototype.submitPair = function () {
        var elipsedTime = Date.now() - this.responseTime;
        var ur = this.response.nativeElement.value || null;
        this.response.nativeElement.value = null;
        var userresponse = {
            word1: this.wordPairs[this.i].word1,
            word2: this.wordPairs[this.i].word2,
            response_number: this.i,
            response: ur,
            response_time: elipsedTime,
            test_phase: this.testPhase
        };
        console.log(userresponse);
        this.wordPairService.saveUserResponse(userresponse);
        if (this.i < this.wordPairs.length - 1) {
            this.i++;
        }
        else {
            //testing done, route to next component
            this.router.navigate(['/instructions']);
            return;
        }
        this.selectedWordPair = this.wordPairs[this.i];
        this.resetTimer();
    };
    // submitPairNoFeedback(): void {
    //   var elipsedTime = Date.now() - this.responseTime;
    //   var ur = this.response.nativeElement.value || null ;
    //   this.response.nativeElement.value = null;
    //   var userresponse = {
    //     word1: this.selectedWordPair.word1,
    //     word2: this.selectedWordPair.word2,
    //     response_number:this.responseNum,
    //     response: ur,
    //     response_time: elipsedTime,
    //     test_phase: this.testPhase
    //   };
    //   this.wordPairService.saveUserResponse(userresponse);
    //   this.showCorrect = false;
    //   if (this.responseNum < this.wordPairs.length -1 ) {
    //       this.responseNum++;
    //   } else {
    //
    //     //testing done, route to next component
    //     this.router.navigate(['/instructions']);
    //     return;
    //   }
    //   this.selectedWordPair = this.wordPairs[this.responseNum];
    //   this.resetTimerNoFeedback();
    // }
    TestPhaseNoFeedbackComponent.prototype.resetTimer = function () {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () { return _this.submitPair(); }, 5000); // TESTING TIME
        this.responseTime = Date.now();
    };
    // resetTimerNoFeedback() : void {
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(() => this.submitPairNoFeedback(), 5000); // TESTING TIME
    //   this.responseTime = Date.now();
    // }
    // ngOnInit(): void {
    //   this.sub = this.route
    //     .queryParams
    //     .subscribe(params => {
    //       // Defaults to 0 if no query param provided.
    //       this.testPhase = +params['test_phase'] || 0;
    //     });
    //   this.getWordPairs();
    //   this.selectedWordPair = {
    //     word1: null,
    //     word2: null
    //   };
    //
    // }
    TestPhaseNoFeedbackComponent.prototype.cycleWords = function () {
        var _this = this;
        this.timer = setTimeout(function () { return _this.submitPair(); }, 5000); // TESTING TIME
    };
    TestPhaseNoFeedbackComponent.prototype.ngOnInit = function () {
        this.i = 0;
        this.responseTime = Date.now();
        this.cycleWords();
    };
    __decorate([
        core_1.ViewChild('response')
    ], TestPhaseNoFeedbackComponent.prototype, "response", void 0);
    __decorate([
        core_1.Input()
    ], TestPhaseNoFeedbackComponent.prototype, "wordPairs", void 0);
    __decorate([
        core_1.Input()
    ], TestPhaseNoFeedbackComponent.prototype, "testPhase", void 0);
    TestPhaseNoFeedbackComponent = __decorate([
        core_1.Component({
            selector: 'test-phase-no-feed-back',
            templateUrl: '../templates/testphasenofeedback.component.html',
            styleUrls: ['../stylesheets/testphase.component.css'],
            providers: [wordpair_service_1.WordPairService]
        })
    ], TestPhaseNoFeedbackComponent);
    return TestPhaseNoFeedbackComponent;
}());
exports.TestPhaseNoFeedbackComponent = TestPhaseNoFeedbackComponent;
