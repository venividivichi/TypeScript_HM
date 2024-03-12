import { Employee } from "../entitys/Employee";
import { IAccounting, IObserver } from "../interfaces/Interfaces";

export class AccountingDepartment implements IObserver, IAccounting {
    public budget: number;
    public totalEarnings: number = 0;
  
    constructor(initialBudget: number) {
      this.budget = initialBudget;
      this.totalEarnings = 0;
    }
    
    update(message: string): void {
      let messageParts = message.split(':');
      if (messageParts[0] === 'DAILY_EARNINGS') {
          let earnings = parseFloat(messageParts[1]);
          this.totalEarnings += earnings;
          console.log(`Accounting updated with daily earnings: $${earnings}. Total earnings now: $${this.totalEarnings}.`);
      }
    }
  
    manageBudget(amount: number, isExpense: boolean = true): void {
      this.budget += isExpense ? -amount : amount;
      console.log(`Budget updated. Current budget: $${this.budget}`);
    }
  
    generateFinancialReport(): void {
      console.log('-----------------------');
      console.log(`Report: Current Budget: $${this.budget}`);
      console.log(`Report: Total earnings: $${this.totalEarnings}`);
    }
  
    paySalaries(employees: Employee[], totalSalaries: number): void {
      if (this.budget >= totalSalaries) {
          employees.forEach(employee => {
              console.log(`Paid ${employee.name} their salary`);
          });
          this.budget -= totalSalaries;
          console.log(`Total salaries paid: $${totalSalaries}. Remaining budget: $${this.budget}`);
      } else {
          console.log('Insufficient funds to pay all salaries');
      }
    }
  
    purchaseFeed(feedCost: number): void {
      if (this.budget >= feedCost) {
          this.budget -= feedCost;
          console.log(`Purchased feed for $${feedCost}. Remaining budget: $${this.budget}`);
      } else {
          console.log('Insufficient funds to purchase feed');
      }
    }
  
    maintainZoo(maintenanceCost: number): void {
      if (this.budget >= maintenanceCost) {
          this.budget -= maintenanceCost;
          console.log(`Zoo maintenance performed for $${maintenanceCost}. Remaining budget: $${this.budget}.`);
      } else {
          console.log('Insufficient funds for maintenance.');
      }
    }
  
    calculateTotalSalaries(employees: Employee[]): number {
      return employees.reduce((total, employee) => total + employee.salary, 0);
    }
  
}