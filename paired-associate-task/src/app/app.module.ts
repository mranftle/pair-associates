import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StudyPhaseComponent } from './components/studyphase.component';
import {TestPhaseNoFeedbackComponent} from "./components/testphasenofeedback.component";
import {LoginComponent} from "./components/login.component"
import {AlertComponent} from "./components/alert.component";
import {AlertService} from "./services/alert.service";
import { AuthGuard } from "./gaurds/auth.gaurd"
import {routing} from "./app.routing";
import {InstructionsComponent} from "./components/instructions.component";
import {WordPairService} from "./services/wordpair.service";
import {AutofocusDirective} from "./directives/autofocus.directive";
import {MemoryTaskComponent} from "./components/memorytask.component";
import {TestPhaseFeedbackComponent} from "./components/testphasefeedback.component";
import {GoodByeComponent} from "./components/goodbye.component";
import {QuestionsComponent} from "./components/questions.component";

@NgModule({
  declarations: [
    AppComponent,
    MemoryTaskComponent,
    InstructionsComponent,
    StudyPhaseComponent,
    TestPhaseNoFeedbackComponent,
    TestPhaseFeedbackComponent,
    QuestionsComponent,
    GoodByeComponent,
    LoginComponent,
    AlertComponent,
    AutofocusDirective
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AlertService,
    AuthGuard,
    WordPairService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
