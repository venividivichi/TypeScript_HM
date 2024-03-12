import { AccountingDepartment } from '../departments/AccountingDepartment';
import { Employee } from '../entitys/Employee';

describe('AccountingDepartment', () => {
    let accounting: AccountingDepartment;
    let initialBudget = 10000;
  
    beforeEach(() => {
        accounting = new AccountingDepartment(initialBudget);
    });

    it('initializes with the correct budget', () => {
        expect(accounting.budget).toBe(initialBudget);
    });

    it('updates total earnings correctly', () => {
        let message = 'DAILY_EARNINGS:500';
        accounting.update(message); 
        expect(accounting.totalEarnings).toBe(500);
    });

    it('manages budget correctly for expenses and income', () => {
        accounting.manageBudget(500, true);
        expect(accounting.budget).toBe(initialBudget - 500);
        accounting.manageBudget(200, false);
        expect(accounting.budget).toBe(initialBudget - 300);
    });

    it('generates financial report correctly', () => {
        let consoleSpy = jest.spyOn(console, 'log');
        accounting.generateFinancialReport();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('calculates total salaries correctly', () => {
        let employees = [
          new Employee('Nazarii Kishman', 'Zookeeper', ['Feed animals', 'Clean enclosures'], 4000),
          new Employee('Bruno Mars', 'Zookeeper', ['Oversee zoo operations'], 3000),
        ];
        let totalSalaries = accounting.calculateTotalSalaries(employees);
        expect(totalSalaries).toBe(7000);
    });

    it('pays salaries when there is enough budget', () => {
        let consoleSpy = jest.spyOn(console, 'log');
        let employees = [
            new Employee('Nazarii Kishman', 'Zookeeper', ['Feed animals', 'Clean enclosures'], 4000),
            new Employee('Bruno Mars', 'Zookeeper', ['Oversee zoo operations'], 3000),
        ];
        accounting.paySalaries(employees, 3000);
        expect(accounting.budget).toBe(initialBudget - 3000);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Total salaries paid'));
        consoleSpy.mockRestore();
    });

    it('purchases feed when there is enough budget', () => {
        let consoleSpy = jest.spyOn(console, 'log');
        accounting.purchaseFeed(500);
        expect(accounting.budget).toBe(initialBudget - 500);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Purchased feed for $500'));
        consoleSpy.mockRestore();
    });

    test('performs maintenance when there is enough budget', () => {
        let consoleSpy = jest.spyOn(console, 'log');
        accounting.maintainZoo(1000);
        expect(accounting.budget).toBe(initialBudget - 1000);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Zoo maintenance performed for $1000'));
        consoleSpy.mockRestore();
      });
});