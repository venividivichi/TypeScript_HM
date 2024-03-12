import {IAdvertisingDepartment, IObserver} from '../interfaces/Interfaces'

export class AdvertisingDepartment implements IObserver, IAdvertisingDepartment {

  update(message: string): void {
      console.log(`Advertising Update: ${message}`);
  }
  
  sendPromotions(message: string, clients: string[]): void {
      clients.forEach(client => {
      console.log(`Sending promotional materials to: ${client}. Message: ${message}`);
    });
  }
}