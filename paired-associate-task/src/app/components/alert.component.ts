/**
 * Created by matthewRanftle1 on 4/11/17.
 */
import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
  moduleId: module.id,
  selector: 'alert',
  templateUrl: '../templates/alert.component.html'
})

export class AlertComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
}
