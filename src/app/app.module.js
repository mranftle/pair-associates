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
var studyphase_component_1 = require('./studyphase.component');
var router_1 = require("@angular/router");
var testphase_component_1 = require("./testphase.component");
var test_component_1 = require("./test.component");
var appRoutes = [
    // { path: 'intro', component: IntroPhaseComponent },
    { path: 'study-phase', component: studyphase_component_1.StudyPhaseComponent },
    { path: 'test-phase', component: testphase_component_1.TestPhaseComponent },
    { path: 'test', component: test_component_1.TestComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                studyphase_component_1.StudyPhaseComponent,
                testphase_component_1.TestPhaseComponent,
                test_component_1.TestComponent
            ],
            imports: [
                router_1.RouterModule.forRoot(appRoutes),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
