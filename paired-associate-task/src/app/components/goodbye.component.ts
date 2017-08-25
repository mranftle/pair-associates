/**
 * Created by matthewRanftle1 on 8/18/17.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'goodbye',
  templateUrl: '../templates/goodbye.component.html',
  styleUrls:['../stylesheets/instructions.component.css',
             '../stylesheets/memorytask.component.css']
})

export class GoodByeComponent {

  constructor(private router:Router) {}

  toLogin() {
    this.router.navigate(['/login']);
  }

}
