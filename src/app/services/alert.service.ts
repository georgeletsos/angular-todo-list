import { Injectable } from '@angular/core';

import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];
  genId = this.idGen();

  constructor() { }

  /**
   * Firstly, generate a new id for the given alert.
   * Then, push the given alert into the stack.
   * Lastly, set a timer that removes the given alert from the stack.
   * @param newAlert An alert
   */
  pushAlert(newAlert: Alert): void {
    newAlert.id = this.genId.next().value;
    this.alerts.push(newAlert);

    setTimeout(() => this.removeAlert(newAlert), 3e3);
  }

  removeAlert(alert: Alert): void {
    this.alerts = this.alerts.filter(a => a.id !== alert.id);
  }

  *idGen(): Generator {
    let id = 1;
    while (true) {
      yield id++;
    }
  }
}
