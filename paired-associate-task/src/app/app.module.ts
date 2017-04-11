import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { StudyPhaseComponent } from './components/studyphase.component';
import {RouterModule, Routes} from "@angular/router";
import {TestPhaseComponent} from "./components/testphase.component";
import {UserComponent} from "./components/user.component"

const appRoutes: Routes = [
  // { path: 'intro', component: IntroPhaseComponent },
  { path: 'study-phase', component: StudyPhaseComponent },
  { path: 'test-phase', component: TestPhaseComponent },
  { path: 'login', component: UserComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    StudyPhaseComponent,
    TestPhaseComponent,
    UserComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
