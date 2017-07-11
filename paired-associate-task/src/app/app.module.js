"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var studyphase_component_1 = require('./components/studyphase.component');
var testphasenofeedback_component_1 = require("./components/testphasenofeedback.component");
var login_component_1 = require("./components/login.component");
var alert_component_1 = require("./components/alert.component");
var alert_service_1 = require("./services/alert.service");
var auth_gaurd_1 = require("./gaurds/auth.gaurd");
var app_routing_1 = require("./app.routing");
var instructions_component_1 = require("./components/instructions.component");
var wordpair_service_1 = require("./services/wordpair.service");
var autofocus_directive_1 = require("./directives/autofocus.directive");
var memorytask_component_1 = require("./components/memorytask/memorytask.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                memorytask_component_1.MemoryTaskComponent,
                instructions_component_1.IntroComponent,
                studyphase_component_1.StudyPhaseComponent,
                testphasenofeedback_component_1.TestPhaseNoFeedbackComponent,
                login_component_1.LoginComponent,
                alert_component_1.AlertComponent,
                autofocus_directive_1.AutofocusDirective
            ],
            imports: [
                app_routing_1.routing,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            providers: [
                alert_service_1.AlertService,
                auth_gaurd_1.AuthGuard,
                wordpair_service_1.WordPairService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
