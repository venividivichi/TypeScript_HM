import { AdvertisingDepartment } from './departments/AdvertisingDepartment'
import { Cashier } from './departments/Cashier'
import { CurrentVisitors } from './entitys/CurrentVisitors'
import { Clients } from './entitys/Clients'
import { AccountingDepartment } from './departments/AccountingDepartment'
import { Administration } from './departments/Administration'

// Initialize departments
export let advertising = new AdvertisingDepartment();
export let accountingg = new AccountingDepartment(10000); // Starting with a budget of $10,000

// Administration has access to Advertising for promotions
export let administration = new Administration(advertising);

// Register departments as observers to the Cashier
export let cashier = new Cashier();
export let currentVisitors = new CurrentVisitors();
export let zooClients = new Clients();

cashier.registerObserver(accountingg);
cashier.registerObserver(advertising);
cashier.registerObserver(currentVisitors);
cashier.registerObserver(zooClients);