import { IObserver } from "../interfaces/Interfaces";

export class Clients implements IObserver {
    update(message: string): void {
      if (message === 'WORK_TIME') {
        console.log(`
          Attention! 
          Our dear\`s!
          The zoo\'s schedule is from 9.00 to 19.00!
          `);
      }
    }
}