"use strict";
/**
 * Created by matthewRanftle1 on 4/11/17.
 */
var router_1 = require('@angular/router');
var login_component_1 = require("./components/login.component");
var memorytask_component_1 = require("./components/memorytask/memorytask.component");
var appRoutes = [
    // { path: 'instructions', component: IntroComponent},//, canActivate:[AuthGuard]},
    // { path: 'study-phase', component: StudyPhaseComponent},//, canActivate:[AuthGuard] },
    // { path: 'test-phase', component: TestPhaseNoFeedbackComponent},//, canActivate:[AuthGuard] },
    { path: 'memory-task', component: memorytask_component_1.MemoryTaskComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
