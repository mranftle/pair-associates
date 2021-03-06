/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login.component";
import {TestPhaseNoFeedbackComponent} from "./components/testphasenofeedback.component";
import {StudyPhaseComponent} from "./components/studyphase.component";
import {AuthGuard} from "./gaurds/auth.gaurd";
import {InstructionsComponent} from "./components/instructions.component";
import {MemoryTaskComponent} from "./components/memorytask.component";
import {GoodByeComponent} from "./components/goodbye.component";


const appRoutes: Routes = [
  // { path: 'instructions', component: InstructionsComponent},//, canActivate:[AuthGuard]},
  // { path: 'study-phase', component: StudyPhaseComponent},//, canActivate:[AuthGuard] },
  // { path: 'test-phase', component: TestPhaseNoFeedbackComponent},//, canActivate:[AuthGuard] },
  { path: 'memory-task', component: MemoryTaskComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'goodbye', component:GoodByeComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
