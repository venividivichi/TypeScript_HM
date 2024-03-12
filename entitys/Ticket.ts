
import { ITicket } from '../interfaces/Interfaces';
import { TicketType } from '../types/Types'
import { TicketPrice } from '../enums/Enums'

export class Ticket implements ITicket {
    public price: number;
    
    constructor(type: TicketType) {
      this.price = TicketPrice[type];
    }
  }