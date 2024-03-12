import { Cashier } from '../departments/Cashier'
import { IObserver } from '../interfaces/Interfaces'

describe('Cashier', () => {

    let cashier: Cashier;
    let mockObserver: IObserver;

    beforeEach( () => {
        cashier = new Cashier();
        mockObserver = { update: jest.fn() };
    })

    it('should register an observer correctly', () => {
        cashier.registerObserver(mockObserver);
        expect(cashier.observers).toContain(mockObserver);
    });

    it('should notify observers with a message', () => {
        cashier.registerObserver(mockObserver);
        cashier.notifyObservers('Test message');
        expect(mockObserver.update).toHaveBeenCalledWith('Test message');
    });

    it('should increase dailyEarnings when a ticket is sold', () => {
        let initialEarnings = cashier.dailyEarnings;
        cashier.sellTicket('Taras Dean', 'taras@example.com', 'Adult');
        expect(cashier.dailyEarnings).toBeGreaterThan(initialEarnings);
      });

    it('should add a new visitor and client when a ticket is sold', () => {
        cashier.sellTicket('Taras Dean', 'taras@example.com', 'Adult');
        expect(cashier.visitors).toHaveLength(1);
        expect(cashier.clients).toHaveLength(1);
        expect(cashier.visitors[0].name).toBe('Taras Dean');
        expect(cashier.clients[0]).toBe('taras@example.com');
    });

    it('should report daily earnings to accounting and reset earnings', () => {
        cashier.registerObserver(mockObserver);
        cashier.dailyEarnings = 100;
        cashier.reportEarningsToAccounting();
        expect(mockObserver.update).toHaveBeenCalledWith(`DAILY_EARNINGS:100`);
        expect(cashier.dailyEarnings).toBe(0);
    });

    it('should send a closing soon message to all observers', () => {
        cashier.registerObserver(mockObserver);
        cashier.sendClosingMessage();
        expect(mockObserver.update).toHaveBeenCalledWith('CLOSING_SOON');
    });

    it('should send zoo schedule message to all observers', () => {
        cashier.registerObserver(mockObserver);
        cashier.sendZooScheduleMessage();
        expect(mockObserver.update).toHaveBeenCalledWith('WORK_HOURS');
    });
    
    it('should send zoo work hours message to all observers', () => {
        cashier.registerObserver(mockObserver);
        cashier.sendZooWorkHoursMessage();
        expect(mockObserver.update).toHaveBeenCalledWith('WORK_TIME');
    });

    it('getClients returns an empty list when no tickets have been sold', () => {
        expect(cashier.getClients()).toEqual([]);
    });

    it('getClients returns a list of client contact information after selling tickets', () => {
        cashier.sellTicket('Sam Dean', 'sam@example.com', 'Child');
        cashier.sellTicket('The Marvel`s Family', 'marvel@example.com', 'Family');
        
        let expectedClients = ['sam@example.com', 'marvel@example.com'];
        expect(cashier.getClients()).toEqual(expect.arrayContaining(expectedClients));
    });
})  