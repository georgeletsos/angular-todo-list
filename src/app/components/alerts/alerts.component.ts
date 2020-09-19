import { Component, OnInit } from '@angular/core';

import { AlertType } from '../../models/alert.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  AlertType = AlertType;

  constructor(public alertService: AlertService) { }

  ngOnInit(): void { }
}
