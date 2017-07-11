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
var core_1 = require('@angular/core');
var auth_service_1 = require('../services/auth.service');
var LoginComponent = (function () {
    function LoginComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        //reset login status
        this.userService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var errMsg;
        this.loading = true;
        this.userService.login(this.username.nativeElement.value, this.password.nativeElement.value)
            .subscribe(function (data) {
            // this.alertService.success('login success')
            _this.router.navigate(['/memory-task']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    __decorate([
        core_1.ViewChild('username')
    ], LoginComponent.prototype, "username", void 0);
    __decorate([
        core_1.ViewChild('password')
    ], LoginComponent.prototype, "password", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: '../templates/login.component.html',
            styleUrls: ['../stylesheets/login.component.css'],
            providers: [auth_service_1.AuthService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
