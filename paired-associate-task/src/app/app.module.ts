import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StudyPhaseComponent } from './components/studyphase.component';
import {TestPhaseComponent} from "./components/testphase.component";
import {LoginComponent} from "./components/login.component"
import {AlertComponent} from "./components/alert.component";
import {AlertService} from "./services/alert.service";
import { AuthGuard } from "./gaurds/auth.gaurd"
import {routing} from "./app.routing";
import {IntroComponent} from "./components/instructions.component";
import {WordPairService} from "./services/wordpair.service";

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    StudyPhaseComponent,
    TestPhaseComponent,
    LoginComponent,
    AlertComponent
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
