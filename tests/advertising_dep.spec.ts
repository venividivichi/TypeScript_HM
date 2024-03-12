import { AdvertisingDepartment } from "../departments/AdvertisingDepartment";

describe('AdvertisingDepartment', () => {
    let advertisingDept: AdvertisingDepartment;
  
    beforeEach(() => {
        advertisingDept = new AdvertisingDepartment();
    });

    it('update logs the correct message', () => {
        let consoleSpy = jest.spyOn(console, 'log');
        let testMessage = 'Test Update Message';
        advertisingDept.update(testMessage);
        expect(consoleSpy).toHaveBeenCalledWith(`Advertising Update: ${testMessage}`);
      });

    it('sendPromotions sends a message to all provided clients', () => {
        let consoleSpy = jest.spyOn(console, 'log');
        let testMessage = 'Promo Sale: 50% off!';
        let testClients = ['taras@example.com', 'taras2@example.com'];
        advertisingDept.sendPromotions(testMessage, testClients);
        testClients.forEach(client => {
          expect(consoleSpy).toHaveBeenCalledWith(`Sending promotional materials to: ${client}. Message: ${testMessage}`);
        });
      });
});