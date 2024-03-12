import { IObserver } from "../interfaces/Interfaces";

export class CurrentVisitors implements IObserver {
    update(message: string): void {
      if (message === 'CLOSING_SOON') {
        console.log('Attention all visitors: The zoo will be closing in 15 minutes');
      } 
      if (message === 'WORK_HOURS') {
        console.log(`Attention all visitors: The zoo working until 19.00!`);
      }
    }
  }