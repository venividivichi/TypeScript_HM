
import { Ticket } from '../entitys/Ticket'
import { TicketPrice } from '../enums/Enums'


describe('Ticket', () => {
    it('should create an instance of Ticket', () => {
        let ticket = new Ticket('Adult');
        expect(ticket).toBeInstanceOf(Ticket);
    })

    it('should set the correct price for Adult ticket', () => {
        let ticket = new Ticket('Adult');
        expect(ticket.price).toEqual(TicketPrice.Adult);
    });
    
    it('should set the correct price for Child ticket', () => {
        let ticket = new Ticket('Child');
        expect(ticket.price).toEqual(TicketPrice.Child);
    });
    
    it('should set the correct price for Family ticket', () => {
        let ticket = new Ticket('Family');
        expect(ticket.price).toEqual(TicketPrice.Family);
    });
})  
