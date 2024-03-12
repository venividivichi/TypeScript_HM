import { cashier, advertising, administration, accountingg } from './index'
import { Animal } from './entitys/Animal'
import { Employee } from './entitys/Employee'

// Adding some animals and employees
administration.addAnimal(new Animal('Lion', 'Leo', 5, 'Healthy'));
administration.addEmployee(new Employee('Nazarii Kishman', 'Zookeeper', ['Feed animals', 'Clean enclosures'], 4000));
administration.addEmployee(new Employee('Bruno Mars', 'Zookeeper', ['Oversee zoo operations'], 3000));
  
console.log('----------------------------');
// Selling tickets
cashier.sellTicket('Taras Dean', 'taras@example.com', 'Adult');
cashier.sellTicket('Sam Dean', 'sam@example.com', 'Child');
cashier.sellTicket('The Marvel`s Family', 'marvel@example.com', 'Family');
console.log('----------------------------');

// End of day, report earnings
cashier.reportEarningsToAccounting();
console.log('----------------------------');

// Send closing message
cashier.sendClosingMessage();
console.log('----------------------------');

// Send closing message
cashier.sendZooScheduleMessage();
console.log('----------------------------');

// Send zoo working schedule
cashier.sendZooWorkHoursMessage();
console.log('----------------------------');

let clients = cashier.getClients();
// AdvertisingDepartment send a promotion
advertising.sendPromotions('Join us tommorow for the special show', clients);

// Administration decides to send a promotion for the next special event
administration.notifyClientsAboutPromotion('Join us next weekend for the special Lion feeding event!', clients);
console.log('----------------------------');
// Example salaries and costs
//let totalSalaries = 3000; // Total salaries for the day
let feedCost = 500; // Cost for animal feed
let maintenanceCost = 2000; // Zoo maintenance cost

let emp = administration.getEmployees();
let totalSalaries = accountingg.calculateTotalSalaries(emp);
console.log(`Total Employees Salaries: $${totalSalaries}`);

// Paying salaries, purchasing feed and maintaining the zoo
console.log('----------------------------');
accountingg.paySalaries(administration.getEmployees(), totalSalaries);
console.log('----------------------------');
accountingg.purchaseFeed(feedCost);
accountingg.maintainZoo(maintenanceCost);

// Generating a financial report
accountingg.generateFinancialReport();