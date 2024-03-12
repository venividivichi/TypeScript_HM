import { ICashier, IObserver, ISubject } from "../interfaces/Interfaces";
import { Visitor } from '../entitys/Visitor';
import { Ticket } from '../entitys/Ticket'
import { TicketType } from '../types/Types'

export class Cashier implements ISubject, ICashier {
  
    public observers: IObserver[] = [];
    public dailyEarnings: number = 0;
    public visitors: Visitor[] = []; 
    public clients: string[] = [];
    
    registerObserver(observer: IObserver): void { this.observers.push(observer); }
  
    removeObserver(observer: IObserver): void { 
      let index = this.observers.findIndex(obs => obs === observer);
      if (index !== -1) {
          this.observers.splice(index, 1);
          console.log('Observer removed');
      } else {
          console.log('Observer not found');
      }
    }
  
    notifyObservers(message: string): void {
      this.observers.forEach(observer => observer.update(message));
    }
  
    sellTicket(visitorName: string, contactInfo: string, ticketType: TicketType): void {
      let ticket = new Ticket(ticketType);
      this.dailyEarnings += ticket.price;
      console.log(`Selling ${ticketType} ticket for $${ticket.price} to ${visitorName}`);
  
      let newVisitor = new Visitor(visitorName, contactInfo);
      this.visitors.push(newVisitor);
  
      this.clients.push(contactInfo);
  
      this.notifyObservers('New ticket sold');
    }
  
    reportEarningsToAccounting(): void {
      this.notifyObservers(`DAILY_EARNINGS:${this.dailyEarnings}`);
      console.log(`Reported $${this.dailyEarnings} of daily earnings to all observers`);
      this.dailyEarnings = 0;
    }
  
    sendClosingMessage(): void {
      this.notifyObservers('CLOSING_SOON');
    }
  
    sendZooScheduleMessage(): void {
      this.notifyObservers('WORK_HOURS');
    }
  
    sendZooWorkHoursMessage(): void {
      this.notifyObservers('WORK_TIME');
    }
  
    getClients(): string[] {
      return this.clients;
    }
}