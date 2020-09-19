export interface Alert {
  id: number;
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success,
  Error,
}
