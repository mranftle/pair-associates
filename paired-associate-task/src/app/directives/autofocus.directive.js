"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by matthewRanftle1 on 4/12/17.
 */
var core_1 = require('@angular/core');
var AutofocusDirective = (function () {
    function AutofocusDirective(elementRef) {
        this.elementRef = elementRef;
    }
    ;
    AutofocusDirective.prototype.ngOnInit = function () {
        this.elementRef.nativeElement.focus();
    };
    AutofocusDirective = __decorate([
        core_1.Directive({
            selector: '[autofocus]'
        })
    ], AutofocusDirective);
    return AutofocusDirective;
}());
exports.AutofocusDirective = AutofocusDirective;
